/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

import {EntryPoints} from "N/types";
import * as log from "N/log";
import * as search from "N/search";

/**
 * Displays NetSuite project records on a webpage
 */
export const onRequest: EntryPoints.Suitelet.onRequest = (context) => {

    try {
        if (context.request.method === "GET") {
            displayProjectsPage(context);
        }
    } catch (e) {
        log.error({
            title: "Error in Project Viewer",
            details: e
        });
        context.response.write({
            output: `<html><body><h1>Error</h1><p>${e}</p></body></html>`
        });
    }
};

const displayProjectsPage = (context: EntryPoints.Suitelet.onRequestContext): void => {

    // Search for projects
    const projectSearch = search.create({
        type: search.Type.JOB, // Jobs are projects in NetSuite
        filters: [
            ["isinactive", "is", "F"] // Only active projects
        ],
        columns: [
            search.createColumn({name: "entityid", label: "Project ID"}),
            search.createColumn({name: "companyname", label: "Project Name"}),
            search.createColumn({name: "custentity_project_status", label: "Status"}),
            search.createColumn({name: "startdate", label: "Start Date"}),
            search.createColumn({name: "enddate", label: "End Date"}),
            search.createColumn({name: "entitystatus", label: "Status"}),
        ]
    });

    const projects: any[] = [];

    projectSearch.run().each((result) => {
        projects.push({
            id: result.id,
            projectId: result.getValue({name: "entityid"}),
            name: result.getValue({name: "companyname"}),
            status: result.getText({name: "entitystatus"}),
            startDate: result.getValue({name: "startdate"}),
            endDate: result.getValue({name: "enddate"})
        });

        return true; // Continue to next result
    });

    // Generate HTML
    const html = generateHTML(projects);

    context.response.write({
        output: html
    });
};

const generateHTML = (projects: any[]): string => {

    let projectRows = "";

    projects.forEach((project) => {
        projectRows += `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${project.projectId}</td>
                <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${project.name}</td>
                <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${project.status || "N/A"}</td>
                <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${project.startDate || "N/A"}</td>
                <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${project.endDate || "N/A"}</td>
            </tr>
        `;
    });

    return `
<!DOCTYPE html>
<html>
<head>
    <title>NetSuite Projects</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            font-size: 32px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 30px;
        }
        .stats {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }
        .stat-card {
            flex: 1;
            min-width: 200px;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .stat-card h3 {
            font-size: 36px;
            color: #667eea;
            margin-bottom: 8px;
        }
        .stat-card p {
            color: #6c757d;
            font-size: 14px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
        }
        thead {
            background: #f8f9fa;
        }
        th {
            padding: 16px 12px;
            text-align: left;
            font-weight: 600;
            color: #495057;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        td {
            padding: 12px;
            color: #212529;
            font-size: 14px;
        }
        tr:hover {
            background: #f8f9fa;
        }
        .no-data {
            text-align: center;
            padding: 60px 20px;
            color: #6c757d;
        }
        .refresh-btn {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            transition: background 0.3s;
        }
        .refresh-btn:hover {
            background: #5568d3;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 NetSuite Projects</h1>
            <p>Real-time project visibility and tracking</p>
        </div>
        
        <div class="content">
            <div class="stats">
                <div class="stat-card">
                    <h3>${projects.length}</h3>
                    <p>Total Projects</p>
                </div>
                <div class="stat-card">
                    <h3>${projects.filter(p => p.status === "In Progress").length}</h3>
                    <p>Active Projects</p>
                </div>
                <div class="stat-card">
                    <h3>${projects.filter(p => p.endDate).length}</h3>
                    <p>With End Dates</p>
                </div>
            </div>

            ${projects.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>Project ID</th>
                        <th>Project Name</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${projectRows}
                </tbody>
            </table>
            ` : `
            <div class="no-data">
                <h2>No Projects Found</h2>
                <p>There are no active projects in your NetSuite account.</p>
            </div>
            `}

            <div style="text-align: center; margin-top: 30px;">
                <a href="?" class="refresh-btn">🔄 Refresh Data</a>
            </div>
        </div>
    </div>
</body>
</html>
    `;
};


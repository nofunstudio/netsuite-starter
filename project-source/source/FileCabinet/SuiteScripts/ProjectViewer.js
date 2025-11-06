/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope Public
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "N/log", "N/search"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onRequest = void 0;
    var log = require("N/log");
    var search = require("N/search");
    /**
     * Displays NetSuite project records on a webpage
     */
    var onRequest = function (context) {
        try {
            if (context.request.method === "GET") {
                displayProjectsPage(context);
            }
        }
        catch (e) {
            log.error({
                title: "Error in Project Viewer",
                details: e
            });
            context.response.write({
                output: "<html><body><h1>Error</h1><p>".concat(e, "</p></body></html>")
            });
        }
    };
    exports.onRequest = onRequest;
    var displayProjectsPage = function (context) {
        // Search for projects
        var projectSearch = search.create({
            type: search.Type.JOB, // Jobs are projects in NetSuite
            filters: [
                ["isinactive", "is", "F"] // Only active projects
            ],
            columns: [
                search.createColumn({ name: "entityid", label: "Project ID" }),
                search.createColumn({ name: "companyname", label: "Project Name" }),
                search.createColumn({ name: "custentity_project_status", label: "Status" }),
                search.createColumn({ name: "startdate", label: "Start Date" }),
                search.createColumn({ name: "enddate", label: "End Date" }),
                search.createColumn({ name: "entitystatus", label: "Status" }),
            ]
        });
        var projects = [];
        projectSearch.run().each(function (result) {
            projects.push({
                id: result.id,
                projectId: result.getValue({ name: "entityid" }),
                name: result.getValue({ name: "companyname" }),
                status: result.getText({ name: "entitystatus" }),
                startDate: result.getValue({ name: "startdate" }),
                endDate: result.getValue({ name: "enddate" })
            });
            return true; // Continue to next result
        });
        // Generate HTML
        var html = generateHTML(projects);
        context.response.write({
            output: html
        });
    };
    var generateHTML = function (projects) {
        var projectRows = "";
        projects.forEach(function (project) {
            projectRows += "\n            <tr>\n                <td style=\"padding: 12px; border-bottom: 1px solid #e0e0e0;\">".concat(project.projectId, "</td>\n                <td style=\"padding: 12px; border-bottom: 1px solid #e0e0e0;\">").concat(project.name, "</td>\n                <td style=\"padding: 12px; border-bottom: 1px solid #e0e0e0;\">").concat(project.status || "N/A", "</td>\n                <td style=\"padding: 12px; border-bottom: 1px solid #e0e0e0;\">").concat(project.startDate || "N/A", "</td>\n                <td style=\"padding: 12px; border-bottom: 1px solid #e0e0e0;\">").concat(project.endDate || "N/A", "</td>\n            </tr>\n        ");
        });
        return "\n<!DOCTYPE html>\n<html>\n<head>\n    <title>NetSuite Projects</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <style>\n        * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n        }\n        body {\n            font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            padding: 40px 20px;\n            min-height: 100vh;\n        }\n        .container {\n            max-width: 1200px;\n            margin: 0 auto;\n            background: white;\n            border-radius: 12px;\n            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n            overflow: hidden;\n        }\n        .header {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n            padding: 30px;\n            text-align: center;\n        }\n        .header h1 {\n            font-size: 32px;\n            font-weight: 600;\n            margin-bottom: 8px;\n        }\n        .header p {\n            font-size: 16px;\n            opacity: 0.9;\n        }\n        .content {\n            padding: 30px;\n        }\n        .stats {\n            display: flex;\n            gap: 20px;\n            margin-bottom: 30px;\n            flex-wrap: wrap;\n        }\n        .stat-card {\n            flex: 1;\n            min-width: 200px;\n            background: #f8f9fa;\n            padding: 20px;\n            border-radius: 8px;\n            text-align: center;\n        }\n        .stat-card h3 {\n            font-size: 36px;\n            color: #667eea;\n            margin-bottom: 8px;\n        }\n        .stat-card p {\n            color: #6c757d;\n            font-size: 14px;\n        }\n        table {\n            width: 100%;\n            border-collapse: collapse;\n            background: white;\n        }\n        thead {\n            background: #f8f9fa;\n        }\n        th {\n            padding: 16px 12px;\n            text-align: left;\n            font-weight: 600;\n            color: #495057;\n            font-size: 14px;\n            text-transform: uppercase;\n            letter-spacing: 0.5px;\n        }\n        td {\n            padding: 12px;\n            color: #212529;\n            font-size: 14px;\n        }\n        tr:hover {\n            background: #f8f9fa;\n        }\n        .no-data {\n            text-align: center;\n            padding: 60px 20px;\n            color: #6c757d;\n        }\n        .refresh-btn {\n            display: inline-block;\n            margin-top: 20px;\n            padding: 12px 24px;\n            background: #667eea;\n            color: white;\n            text-decoration: none;\n            border-radius: 6px;\n            font-weight: 500;\n            transition: background 0.3s;\n        }\n        .refresh-btn:hover {\n            background: #5568d3;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <div class=\"header\">\n            <h1>\uD83D\uDE80 NetSuite Projects</h1>\n            <p>Real-time project visibility and tracking</p>\n        </div>\n        \n        <div class=\"content\">\n            <div class=\"stats\">\n                <div class=\"stat-card\">\n                    <h3>".concat(projects.length, "</h3>\n                    <p>Total Projects</p>\n                </div>\n                <div class=\"stat-card\">\n                    <h3>").concat(projects.filter(function (p) { return p.status === "In Progress"; }).length, "</h3>\n                    <p>Active Projects</p>\n                </div>\n                <div class=\"stat-card\">\n                    <h3>").concat(projects.filter(function (p) { return p.endDate; }).length, "</h3>\n                    <p>With End Dates</p>\n                </div>\n            </div>\n\n            ").concat(projects.length > 0 ? "\n            <table>\n                <thead>\n                    <tr>\n                        <th>Project ID</th>\n                        <th>Project Name</th>\n                        <th>Status</th>\n                        <th>Start Date</th>\n                        <th>End Date</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ".concat(projectRows, "\n                </tbody>\n            </table>\n            ") : "\n            <div class=\"no-data\">\n                <h2>No Projects Found</h2>\n                <p>There are no active projects in your NetSuite account.</p>\n            </div>\n            ", "\n\n            <div style=\"text-align: center; margin-top: 30px;\">\n                <a href=\"?\" class=\"refresh-btn\">\uD83D\uDD04 Refresh Data</a>\n            </div>\n        </div>\n    </div>\n</body>\n</html>\n    ");
    };
});

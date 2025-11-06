/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

import {EntryPoints} from "N/types";
import * as log from "N/log";

/**
 * Simple test version - displays a basic webpage
 */
export const onRequest: EntryPoints.Suitelet.onRequest = (context) => {

    try {
        log.debug({
            title: "ProjectViewer - Request received",
            details: "Script is running successfully"
        });

        const html = `
<!DOCTYPE html>
<html>
<head>
    <title>NetSuite Project Viewer - Test</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 40px;
            text-align: center;
        }
        h1 {
            color: #667eea;
            font-size: 48px;
            margin-bottom: 20px;
        }
        p {
            color: #6c757d;
            font-size: 18px;
            line-height: 1.6;
        }
        .success {
            background: #d4edda;
            color: #155724;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 Success!</h1>
        <div class="success">
            <h2>Your NetSuite Suitelet is Working!</h2>
        </div>
        <p>
            This proves that your script is deployed and running correctly.
            <br><br>
            <strong>Next step:</strong> We'll add the project search functionality.
        </p>
        <p style="margin-top: 30px; font-size: 14px; color: #999;">
            Script: ProjectViewer | Account: TD3049589
        </p>
    </div>
</body>
</html>
        `;

        context.response.write({
            output: html
        });

    } catch (e) {
        log.error({
            title: "Error in ProjectViewer",
            details: e
        });

        context.response.write({
            output: `<html><body><h1>Error</h1><pre>${JSON.stringify(e, null, 2)}</pre></body></html>`
        });
    }
};


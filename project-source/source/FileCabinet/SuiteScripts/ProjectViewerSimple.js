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
        define(["require", "exports", "N/log"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onRequest = void 0;
    var log = require("N/log");
    /**
     * Simple test version - displays a basic webpage
     */
    var onRequest = function (context) {
        try {
            log.debug({
                title: "ProjectViewer - Request received",
                details: "Script is running successfully"
            });
            var html = "\n<!DOCTYPE html>\n<html>\n<head>\n    <title>NetSuite Project Viewer - Test</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <style>\n        * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n        }\n        body {\n            font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            padding: 40px 20px;\n            min-height: 100vh;\n        }\n        .container {\n            max-width: 800px;\n            margin: 0 auto;\n            background: white;\n            border-radius: 12px;\n            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n            padding: 40px;\n            text-align: center;\n        }\n        h1 {\n            color: #667eea;\n            font-size: 48px;\n            margin-bottom: 20px;\n        }\n        p {\n            color: #6c757d;\n            font-size: 18px;\n            line-height: 1.6;\n        }\n        .success {\n            background: #d4edda;\n            color: #155724;\n            padding: 20px;\n            border-radius: 8px;\n            margin: 30px 0;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <h1>\uD83C\uDF89 Success!</h1>\n        <div class=\"success\">\n            <h2>Your NetSuite Suitelet is Working!</h2>\n        </div>\n        <p>\n            This proves that your script is deployed and running correctly.\n            <br><br>\n            <strong>Next step:</strong> We'll add the project search functionality.\n        </p>\n        <p style=\"margin-top: 30px; font-size: 14px; color: #999;\">\n            Script: ProjectViewer | Account: TD3049589\n        </p>\n    </div>\n</body>\n</html>\n        ";
            context.response.write({
                output: html
            });
        }
        catch (e) {
            log.error({
                title: "Error in ProjectViewer",
                details: e
            });
            context.response.write({
                output: "<html><body><h1>Error</h1><pre>".concat(JSON.stringify(e, null, 2), "</pre></body></html>")
            });
        }
    };
    exports.onRequest = onRequest;
});

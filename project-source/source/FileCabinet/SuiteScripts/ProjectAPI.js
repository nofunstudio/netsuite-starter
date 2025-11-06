/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @NModuleScope Public
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "N/log", "N/search", "N/record"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.post = exports.get = void 0;
    var log = require("N/log");
    var search = require("N/search");
    var record = require("N/record");
    /**
     * RESTlet API to fetch NetSuite project records
     * Can be called from external webpages using OAuth 2.0
     */
    var get = function (requestParams) {
        try {
            log.debug({
                title: "Project API Called",
                details: "Request params: ".concat(JSON.stringify(requestParams))
            });
            var projects = searchProjects();
            return {
                success: true,
                count: projects.length,
                data: projects
            };
        }
        catch (e) {
            log.error({
                title: "Error in Project API",
                details: e
            });
            return {
                success: false,
                error: e.message || e.toString()
            };
        }
    };
    exports.get = get;
    /**
     * Search for projects with optional filters
     */
    var searchProjects = function () {
        // Simplest possible search - NO filters to test basic functionality
        var filters = [];
        var projectSearch = search.create({
            type: search.Type.JOB, // Project record type
            filters: filters.length > 0 ? filters : undefined,
            columns: [
                search.createColumn({ name: "entityid" }),
                search.createColumn({ name: "companyname" }),
            ]
        });
        var projects = [];
        projectSearch.run().each(function (result) {
            projects.push({
                id: result.id,
                projectId: result.getValue({ name: "entityid" }),
                projectName: result.getValue({ name: "companyname" }) || result.getValue({ name: "entityid" }),
                status: "Active"
            });
            return true; // Continue to next result
        });
        return projects;
    };
    /**
     * POST endpoint to create a new project
     */
    var post = function (requestBody) {
        try {
            log.debug({
                title: "Create Project API Called",
                details: "Request body: ".concat(JSON.stringify(requestBody))
            });
            // Create a new project (Job) record
            var projectRecord = record.create({
                type: record.Type.JOB,
                isDynamic: true
            });
            // Set project fields
            if (requestBody.projectName) {
                projectRecord.setValue({
                    fieldId: "companyname",
                    value: requestBody.projectName
                });
            }
            if (requestBody.customerId) {
                projectRecord.setValue({
                    fieldId: "parent",
                    value: requestBody.customerId
                });
            }
            if (requestBody.startDate) {
                projectRecord.setValue({
                    fieldId: "startdate",
                    value: new Date(requestBody.startDate)
                });
            }
            if (requestBody.endDate) {
                projectRecord.setValue({
                    fieldId: "enddate",
                    value: new Date(requestBody.endDate)
                });
            }
            // Save the project
            var projectId = projectRecord.save();
            log.audit({
                title: "Project Created Successfully",
                details: "Project ID: ".concat(projectId)
            });
            return {
                success: true,
                projectId: projectId,
                message: "Project created successfully"
            };
        }
        catch (e) {
            log.error({
                title: "Error creating project",
                details: e
            });
            return {
                success: false,
                error: e.message || e.toString()
            };
        }
    };
    exports.post = post;
});

/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @NModuleScope Public
 */

import { EntryPoints } from "N/types";
import * as log from "N/log";
import * as search from "N/search";
import * as record from "N/record";

/**
 * RESTlet API to fetch NetSuite project records
 * Can be called from external webpages using OAuth 2.0
 */
export const get: EntryPoints.RESTlet.get = (requestParams) => {
	try {
		log.debug({
			title: "Project API Called",
			details: `Request params: ${JSON.stringify(requestParams)}`,
		});

		const projects = searchProjects();

		return {
			success: true,
			count: projects.length,
			data: projects,
		};
	} catch (e) {
		log.error({
			title: "Error in Project API",
			details: e,
		});

		return {
			success: false,
			error: e.message || e.toString(),
		};
	}
};

/**
 * Search for projects with optional filters
 */
const searchProjects = (): any[] => {
	// Simplest possible search - NO filters to test basic functionality
	const filters: any[] = [];

	const projectSearch = search.create({
		type: search.Type.JOB, // Project record type
		filters: filters.length > 0 ? filters : undefined,
		columns: [
			search.createColumn({ name: "entityid" }),
			search.createColumn({ name: "companyname" }),
		],
	});

	const projects: any[] = [];

	projectSearch.run().each((result) => {
		projects.push({
			id: result.id,
			projectId: result.getValue({ name: "entityid" }),
			projectName:
				result.getValue({ name: "companyname" }) ||
				result.getValue({ name: "entityid" }),
			status: "Active",
		});

		return true; // Continue to next result
	});

	return projects;
};

/**
 * POST endpoint to create a new project
 */
export const post: EntryPoints.RESTlet.post = (requestBody) => {
	try {
		log.debug({
			title: "Create Project API Called",
			details: `Request body: ${JSON.stringify(requestBody)}`,
		});

		// Create a new project (Job) record
		const projectRecord = record.create({
			type: record.Type.JOB,
			isDynamic: true,
		});

		// Set project fields
		if (requestBody.projectName) {
			projectRecord.setValue({
				fieldId: "companyname",
				value: requestBody.projectName,
			});
		}

		if (requestBody.customerId) {
			projectRecord.setValue({
				fieldId: "parent",
				value: requestBody.customerId,
			});
		}

		if (requestBody.startDate) {
			projectRecord.setValue({
				fieldId: "startdate",
				value: new Date(requestBody.startDate),
			});
		}

		if (requestBody.endDate) {
			projectRecord.setValue({
				fieldId: "enddate",
				value: new Date(requestBody.endDate),
			});
		}

		// Save the project
		const projectId = projectRecord.save();

		log.audit({
			title: "Project Created Successfully",
			details: `Project ID: ${projectId}`,
		});

		return {
			success: true,
			projectId: projectId,
			message: "Project created successfully",
		};
	} catch (e) {
		log.error({
			title: "Error creating project",
			details: e,
		});

		return {
			success: false,
			error: e.message || e.toString(),
		};
	}
};

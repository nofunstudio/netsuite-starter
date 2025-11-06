# ACCOUNTCUSTOMIZATION: my-netsuite-project

## 📋 What's In This Project

**For a complete list of all files created and what they do, see:** [`CHANGELOG.md`](./CHANGELOG.md)

This project contains:
- **ProjectAPI.ts** - RESTlet API for fetching/creating NetSuite projects
- **ProjectViewer.ts** - Suitelet webpage for displaying projects in NetSuite
- **Customer Portal** - External portal (see `/netsuite-customer-portal/` directory)

## Initial Steps

1) Install [SuiteCloud CLI](https://github.com/oracle/netsuite-suitecloud-sdk/tree/master/packages/node-cli) globally ✅
2) Check the details in the .env file
3) Write your TypeScript code inside the source folder
4) Type `nsx build` to produce an artifact

## NSX commands

`nsx template` creates a NetSuite script or component file

`nsx artifact` produces a zipped artifact in the deploy folder

`nsx build` transpiles, lints, and runs tests before producing the artifact

## Test Setup

- suitecloud.config.js is for the SuiteCloud jest configuration
- jest.config.js is for the jest project type configuration
- Start tests using `npm test`

For more information
see: [Oracle's SuiteCloud jest](https://github.com/oracle/netsuite-suitecloud-sdk/tree/master/packages/unit-testing)

## NetSuite Authentication

This project uses Token-Based Authentication (TBA). Your credentials are stored in the `.env` file:
- `NETSUITE_ACCOUNT_ID`: Your NetSuite account ID
- `NETSUITE_CLIENT_ID`: Your integration client ID
- `NETSUITE_CLIENT_SECRET`: Your integration client secret

To set up authentication with NetSuite:
1. Run `suitecloud account:setup` to configure your account
2. Run `suitecloud project:validate` to validate your project structure
3. Run `suitecloud project:deploy` to deploy to NetSuite


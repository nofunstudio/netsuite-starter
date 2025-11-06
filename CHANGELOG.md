# NetSuite Project - Changelog & File List

## Overview
This project was created to expose NetSuite project records on a customer-facing webpage. It includes RESTlet APIs and a customer portal.

## What Was Built

### 1. NetSuite RESTlet API (`ProjectAPI.ts/js`)
- **Purpose:** REST API endpoint that fetches and creates NetSuite project records
- **Location:** `source/FileCabinet/SuiteScripts/ProjectAPI.ts` (source)
- **Location:** `source/FileCabinet/SuiteScripts/ProjectAPI.js` (compiled)
- **Deployed to:** NetSuite RESTlet (script ID: 5025, deploy: 2)
- **Endpoints:**
  - `GET`: Returns all projects
  - `POST`: Creates new projects

### 2. NetSuite Suitelet Webpages (`ProjectViewer.ts/js`)
- **Purpose:** Webpage hosted in NetSuite to display projects
- **Location:** `source/FileCabinet/SuiteScripts/ProjectViewer.ts` (source)
- **Location:** `source/FileCabinet/SuiteScripts/ProjectViewer.js` (compiled)
- **Status:** Created but not working due to external access restrictions

### 3. Customer Portal (`netsuite-customer-portal/`)
- **Purpose:** External customer portal with OAuth authentication
- **Location:** `/Users/jamessimmons/Documents/GitHub/netsuite-customer-portal/`
- **Components:**
  - Node.js Express server (`server.js`)
  - HTML/CSS/JS frontend (`public/index.html`)
  - OAuth 2.0 authentication
  - Beautiful responsive UI

## All Files Created/Modified

### NetSuite Project Files (`/my-netsuite-project/`)

#### Source TypeScript Files (COMMIT THESE)
- ✅ `source/FileCabinet/SuiteScripts/ProjectAPI.ts` - RESTlet API source
- ✅ `source/FileCabinet/SuiteScripts/ProjectViewer.ts` - Suitelet webpage source
- ✅ `source/FileCabinet/SuiteScripts/ProjectViewerSimple.ts` - Test Suitelet
- ✅ `source/FileCabinet/SuiteScripts/examples/HelloWorld.ts` - Example script

#### Compiled JavaScript Files (GENERATED - Optional to commit)
- ⚠️ `source/FileCabinet/SuiteScripts/ProjectAPI.js` - Compiled RESTlet (deployed)
- ⚠️ `source/FileCabinet/SuiteScripts/ProjectViewer.js` - Compiled Suitelet
- ⚠️ `source/FileCabinet/SuiteScripts/ProjectViewerSimple.js` - Compiled test
- ⚠️ `source/FileCabinet/SuiteScripts/examples/HelloWorld.js` - Compiled example

#### Configuration Files (COMMIT THESE)
- ✅ `package.json` - Node dependencies
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `tslint.json` - Linting rules
- ✅ `suitecloud.config.js` - SuiteCloud deployment config
- ✅ `jest.config.js` - Test configuration
- ✅ `source/manifest.xml` - NetSuite project manifest
- ✅ `source/deploy.xml` - Deployment configuration

#### Documentation (COMMIT THESE)
- ✅ `DEPLOYMENT-GUIDE.md` - Deployment instructions
- ✅ `README.md` - Project README
- ✅ `example-webpage.html` - Example HTML for RESTlet API

#### Do NOT Commit
- ❌ `.env` - Contains sensitive credentials
- ❌ `node_modules/` - Dependencies (auto-generated)
- ❌ `deploy/` - Deployment artifacts (auto-generated)
- ❌ `*.log` - Log files

### Customer Portal Files (`/netsuite-customer-portal/`)

#### Application Files (COMMIT THESE)
- ✅ `server.js` - Express server with OAuth
- ✅ `public/index.html` - Customer portal UI
- ✅ `package.json` - Dependencies
- ✅ `README.md` - Portal documentation
- ✅ `QUICK-START.md` - Quick start guide
- ✅ `.gitignore` - Git ignore rules

#### Do NOT Commit
- ❌ `.env` - Contains OAuth credentials (KEEP SECRET!)
- ❌ `server.log` - Log files
- ❌ `node_modules/` - Dependencies
- ❌ `.env.new` - Temporary file (can delete)

## Git Commit Instructions

### For NetSuite Project (`/my-netsuite-project/`)

```bash
cd /Users/jamessimmons/Documents/GitHub/my-netsuite-project

# Add TypeScript source files (required)
git add source/FileCabinet/SuiteScripts/*.ts
git add source/FileCabinet/SuiteScripts/examples/*.ts

# Add configuration files
git add package.json tsconfig.json tslint.json suitecloud.config.js jest.config.js
git add source/manifest.xml source/deploy.xml

# Add documentation
git add DEPLOYMENT-GUIDE.md README.md example-webpage.html

# Optional: Add compiled JS files (if you want to track them)
git add source/FileCabinet/SuiteScripts/*.js
git add source/FileCabinet/SuiteScripts/examples/*.js

# Commit
git commit -m "Add NetSuite RESTlet API and Suitelet webpages for project visibility

- Created ProjectAPI RESTlet for fetching/creating projects
- Created ProjectViewer Suitelet for in-NetSuite webpage
- Added TypeScript source files and configuration
- Added deployment documentation"
```

### For Customer Portal (`/netsuite-customer-portal/`)

```bash
cd /Users/jamessimmons/Documents/GitHub/netsuite-customer-portal

# Add application files
git add server.js public/index.html package.json
git add README.md QUICK-START.md .gitignore

# Commit
git commit -m "Add NetSuite customer portal with OAuth authentication

- Express server with NetSuite OAuth 2.0 integration
- Responsive customer portal UI
- REST API endpoints for project data
- Documentation and quick start guide"
```

## Important Notes

### ⚠️ Security Warnings
- **NEVER commit `.env` files** - They contain OAuth credentials
- **NEVER commit `node_modules/`** - Already in .gitignore
- **NEVER commit access tokens** - Keep them secret

### 🔄 Generated Files
- `.js` files are compiled from `.ts` files
- They're regenerated when you run `npx tsc`
- You can commit them, but it's optional (source of truth is `.ts`)

### 📦 Deployment
- **NetSuite scripts:** Deployed via `suitecloud project:deploy`
- **Customer portal:** Run locally with `node server.js` or deploy to hosting

## Current Status

✅ **Working:**
- OAuth authentication configured
- RESTlet API deployed to NetSuite
- Customer portal server running
- Beautiful UI built

❌ **Not Working:**
- API returns 0 projects (permission issue)
- Token needs "Lists → Projects" permission
- Need to create new token after permission update

## Next Steps

1. Update NetSuite role permissions (Lists → Projects → View/Full)
2. Create new OAuth token with updated permissions
3. Update `.env` with new token
4. Restart server and test
5. Commit all changes to git

---

**Last Updated:** November 5, 2025
**Files Created:** ~20 files across 2 projects
**Total Lines of Code:** ~1,500+ lines


# 🚀 Deployment Guide: Display NetSuite Projects on a Webpage

This guide shows you how to deploy your project viewer scripts to NetSuite.

## 📋 What You Have

I've created **2 solutions** for displaying NetSuite project records:

### ✅ Option 1: Suitelet (Webpage in NetSuite) - **EASIEST**
- **File:** `ProjectViewer.ts`
- **What it does:** Creates a beautiful webpage hosted inside NetSuite
- **Best for:** Internal users, customer portal within NetSuite
- **URL:** Will be like `https://td3049589.app.netsuite.com/app/site/hosting/scriptlet.nl?script=XXX&deploy=1`

### ✅ Option 2: RESTlet API (External Webpage)
- **File:** `ProjectAPI.ts`
- **What it does:** API endpoint that external websites can call
- **Best for:** Embedding on your own website, mobile apps
- **Example:** `example-webpage.html` shows how to use it

---

## 🔧 Step-by-Step Deployment

### Step 1: Authenticate with NetSuite

```bash
cd /Users/jamessimmons/Documents/GitHub/my-netsuite-project
suitecloud account:setup
```

- Enter an auth ID (e.g., "dev")
- Browser will open → Login to NetSuite
- Select your role
- Done!

### Step 2: Deploy to NetSuite

```bash
suitecloud project:deploy
```

This uploads all your scripts to NetSuite.

### Step 3: Create Script Records

After deployment, you need to create Script and Deployment records in NetSuite:

#### For ProjectViewer.ts (Suitelet):

1. **In NetSuite:** Go to **Customization > Scripting > Scripts > New**
2. Click **SuiteCloud Project**
3. Find and select: **ProjectViewer.ts**
4. Fill in:
   - **Name:** Project Viewer
   - **ID:** `_project_viewer`
5. Click **Save**
6. On the Deployments tab, click **Add**
7. Fill in:
   - **Status:** Released
   - **Audience:** All Roles (or specific roles)
8. Click **Save**
9. **Copy the URL** - this is your webpage!

#### For ProjectAPI.ts (RESTlet):

1. **In NetSuite:** Go to **Customization > Scripting > Scripts > New**
2. Click **SuiteCloud Project**
3. Find and select: **ProjectAPI.ts**
4. Fill in:
   - **Name:** Project API
   - **ID:** `_project_api`
5. Click **Save**
6. On the Deployments tab, click **Add**
7. Fill in:
   - **Status:** Released
   - **Audience:** All Roles
8. Click **Save**
9. **Copy the External URL** - use this in your webpage

---

## 🌐 Using the Solutions

### Option 1: Suitelet (In NetSuite)

Once deployed, you get a URL like:
```
https://td3049589.app.netsuite.com/app/site/hosting/scriptlet.nl?script=123&deploy=1
```

**That's it!** Just visit this URL to see your projects.

You can:
- Share this link with customers
- Embed it in an iframe
- Add it to your NetSuite navigation

### Option 2: RESTlet API (External Website)

1. Get your RESTlet URL from NetSuite
2. Open `example-webpage.html`
3. Update the CONFIG section:
   ```javascript
   restletUrl: 'YOUR_RESTLET_URL_HERE'
   ```
4. Uncomment the line: `// fetchProjects();`
5. Host the HTML file on your website

---

## 🔐 Important: OAuth for External API

For the RESTlet API to work from external websites, you'll need proper OAuth 2.0:

1. The HTML example shows client-side (NOT SECURE for production)
2. **For production:** Use a backend server (Node.js, Python, etc.) to:
   - Handle OAuth authentication
   - Call NetSuite API
   - Return data to your frontend

Would you like me to create a Node.js backend example?

---

## 📊 Customizing the Display

### Want to show different fields?

Edit the search columns in `ProjectViewer.ts` or `ProjectAPI.ts`:

```typescript
columns: [
    search.createColumn({name: "entityid", label: "Project ID"}),
    search.createColumn({name: "companyname", label: "Project Name"}),
    // Add more fields:
    search.createColumn({name: "custentity_your_field", label: "Custom Field"}),
]
```

### Want to filter by customer?

The RESTlet already supports this! Just add a customer ID to the URL:
```
https://your-restlet-url?customerId=123
```

---

## ✅ Quick Start Commands

```bash
# 1. Authenticate
cd /Users/jamessimmons/Documents/GitHub/my-netsuite-project
suitecloud account:setup

# 2. Validate your project
suitecloud project:validate

# 3. Deploy to NetSuite
suitecloud project:deploy

# 4. Follow the "Create Script Records" steps above

# 5. Open the Suitelet URL in your browser!
```

---

## 🎯 What's Next?

- ✅ View projects on a webpage
- 🔜 Add filtering by customer
- 🔜 Add approval workflows
- 🔜 Add document viewing
- 🔜 Add billing information

Let me know which feature you want to add next!


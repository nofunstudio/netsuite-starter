# NetSuite Customer Portal - Quick Start Guide

## Prerequisites
- Node.js installed
- NetSuite account with SuiteCloud CLI installed
- OAuth credentials from NetSuite

## Setup Steps

### 1. Navigate to Project Directory
```bash
cd /Users/jamessimmons/Documents/GitHub/netsuite-customer-portal
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Edit the `.env` file with your NetSuite credentials:
```bash
# NetSuite Account
NETSUITE_ACCOUNT_ID=td3049589
NETSUITE_REALM=TD3049589

# OAuth Consumer Credentials
NETSUITE_CONSUMER_KEY=your_consumer_key_here
NETSUITE_CONSUMER_SECRET=your_consumer_secret_here

# Access Token Credentials
NETSUITE_TOKEN_ID=your_token_id_here
NETSUITE_TOKEN_SECRET=your_token_secret_here

# RESTlet URL
RESTLET_URL=https://td3049589.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=5025&deploy=2

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 4. Start the Server
```bash
PORT=3001 node server.js
```

Or run in background:
```bash
PORT=3001 node server.js > server.log 2>&1 &
```

### 5. Test the API
```bash
curl http://localhost:3001/api/projects
```

Or check health:
```bash
curl http://localhost:3001/api/health
```

### 6. View Portal in Browser
Open: http://localhost:3001

## Troubleshooting Commands

### Check Server Logs
```bash
tail -f server.log
```

### Check if Server is Running
```bash
ps aux | grep "node server.js"
```

### Kill Server
```bash
pkill -f "node server.js"
```

### Restart Server
```bash
pkill -f "node server.js" && sleep 2 && PORT=3001 node server.js > server.log 2>&1 &
```

### Test API with Pretty Print
```bash
curl -s http://localhost:3001/api/projects | python3 -m json.tool
```

## Common Issues

### Permission Error
If you see: `"Permission Violation: You need the 'Lists -> Projects' permission"`
- The token's role needs "Lists → Projects" permission set to "View" or "Full"
- Create a NEW token after updating permissions

### Port Already in Use
Change PORT in `.env` to another number (e.g., 3002)

### No Projects Showing
- Check that projects exist in NetSuite
- Verify RESTlet URL is correct
- Check server logs: `tail server.log`

## RESTlet Deployment (if needed)

### Navigate to NetSuite Project
```bash
cd /Users/jamessimmons/Documents/GitHub/my-netsuite-project
```

### Compile TypeScript
```bash
npx tsc
```

### Deploy to NetSuite
```bash
suitecloud project:deploy
```

### Authenticate with NetSuite (if needed)
```bash
suitecloud account:setup
```

## Project Structure
```
netsuite-customer-portal/
├── server.js          # Node.js backend with OAuth
├── public/
│   └── index.html     # Customer portal UI
├── .env               # Configuration (keep secret!)
├── server.log         # Server logs
└── package.json       # Dependencies
```

## Key Files
- **Server:** `server.js` - Express server with OAuth authentication
- **Frontend:** `public/index.html` - Customer portal interface
- **Config:** `.env` - All credentials and settings


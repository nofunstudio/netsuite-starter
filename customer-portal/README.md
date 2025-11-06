# NetSuite Customer Portal

A professional customer portal that displays NetSuite project records using OAuth 2.0 authentication.

## 🎯 What This Does

Provides external customers with real-time visibility into their NetSuite projects through a clean, branded web interface.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure NetSuite Token-Based Authentication (TBA)

You need to create an **Access Token** in NetSuite:

#### Steps:
1. **In NetSuite**, go to: **Setup → Users/Roles → Access Tokens → New**
2. Fill in:
   - **Application Name:** Customer Portal
   - **User:** Your admin user
   - **Role:** Administrator
   - **Token Name:** Customer Portal Token
3. Click **Save**
4. **IMPORTANT:** Copy the **Token ID** and **Token Secret** immediately (you won't see them again!)

### 3. Get Your RESTlet URL

1. **In NetSuite**, go to: **Customization → Scripting → Scripts**
2. Find **"ProjectAPI"** (we already deployed this!)
3. Go to **Deployments** tab
4. Create a deployment if you haven't:
   - Click **New**
   - Status: **Released**
   - Click **Save**
5. **Copy the External URL** - it looks like:
   ```
   https://td3049589.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=XXXX&deploy=1
   ```

### 4. Update .env File

Open `.env` and update:

```env
# Add your Token ID and Secret from Step 2
NETSUITE_TOKEN_ID=your_token_id_here
NETSUITE_TOKEN_SECRET=your_token_secret_here

# Add your RESTlet URL from Step 3
RESTLET_URL=https://td3049589.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=XXXX&deploy=1
```

### 5. Start the Server

```bash
npm start
```

The portal will be available at: **http://localhost:3000**

## 🧪 Testing

1. Open your browser to: http://localhost:3000
2. You should see your NetSuite projects!

## 📁 Project Structure

```
netsuite-customer-portal/
├── server.js           # Node.js backend with OAuth
├── public/
│   └── index.html      # Customer portal UI
├── .env                # Configuration (keep secret!)
├── package.json        # Dependencies
└── README.md           # This file
```

## 🔐 Security Notes

- **Never commit .env** to version control (already in .gitignore)
- Keep your Token ID and Secret secure
- Use HTTPS in production
- Consider adding customer authentication

## 🚀 Deployment to Production

When ready to go live:

1. **Get a domain** (e.g., portal.yourcompany.com)
2. **Deploy to a hosting service:**
   - **Heroku**: Simple, quick
   - **AWS EC2/Elastic Beanstalk**: More control
   - **DigitalOcean**: Cost-effective
   - **Vercel/Netlify** (with serverless functions)

3. **Update .env** with production values
4. **Enable HTTPS** (most hosts provide this free)
5. **Add customer authentication** if needed

## 🎨 Customization

### Filter by Customer

To show only specific customer's projects, edit `public/index.html`:

```javascript
const response = await fetch('/api/projects?customerId=123');
```

### Change Branding

Edit `public/index.html`:
- Update colors in the `<style>` section
- Change the header title and logo
- Modify the card layouts

## 📊 API Endpoints

### GET /api/projects
Returns all projects or filtered by customer

**Query Parameters:**
- `customerId` (optional) - Filter projects by customer ID

**Response:**
```json
{
  "success": true,
  "count": 5,
  "projects": [...]
}
```

### GET /api/health
Health check endpoint

## 🐛 Troubleshooting

### "Error fetching projects"
- Check that your Token ID/Secret are correct
- Verify the RESTlet URL is correct
- Make sure ProjectAPI script is deployed in NetSuite

### "401 Unauthorized"
- Token might be invalid or expired
- Check that the user/role has permissions

### "Script not found"
- Verify the script ID in the RESTlet URL
- Check that the deployment is "Released"

## 📞 Support

For issues or questions, check:
1. NetSuite Script Execution Log
2. Server console output
3. Browser developer console

---

Built for Marabou Midstream Services, LLC


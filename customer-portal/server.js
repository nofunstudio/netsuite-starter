const express = require('express');
const cors = require('cors');
const axios = require('axios');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// OAuth 1.0a Configuration for NetSuite
const oauth = OAuth({
    consumer: {
        key: process.env.NETSUITE_CONSUMER_KEY,
        secret: process.env.NETSUITE_CONSUMER_SECRET
    },
    signature_method: 'HMAC-SHA256',
    hash_function(base_string, key) {
        return crypto.HmacSHA256(base_string, key).toString(crypto.enc.Base64);
    }
});

const token = {
    key: process.env.NETSUITE_TOKEN_ID,
    secret: process.env.NETSUITE_TOKEN_SECRET
};

// API Endpoint: Get Projects
app.get('/api/projects', async (req, res) => {
    try {
        const customerId = req.query.customerId;
        
        // Build RESTlet URL with optional customer filter
        let restletUrl = process.env.RESTLET_URL;
        if (customerId) {
            restletUrl += `&customerId=${customerId}`;
        }

        const requestData = {
            url: restletUrl,
            method: 'GET'
        };

        // Generate OAuth headers
        const authData = oauth.authorize(requestData, token);
        const authHeaders = oauth.toHeader(authData);
        
        // Add NetSuite realm to Authorization header
        const authHeader = authHeaders['Authorization'].replace(
            'OAuth ',
            `OAuth realm="${process.env.NETSUITE_REALM}",`
        );
        
        // Add NetSuite specific headers
        const headers = {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        console.log('Calling NetSuite RESTlet:', restletUrl);
        console.log('Authorization:', authHeader.substring(0, 100) + '...');

        // Call NetSuite RESTlet
        const response = await axios.get(restletUrl, { headers });

        console.log('NetSuite Response:', response.data);

        // Return project data
        res.json({
            success: true,
            projects: response.data.data || [],
            count: response.data.count || 0
        });

    } catch (error) {
        console.error('Error fetching projects:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data?.message || error.message,
            details: 'Failed to fetch projects from NetSuite'
        });
    }
});

// API Endpoint: Create Project
app.post('/api/projects/create', async (req, res) => {
    try {
        const { projectName, customerId, startDate, endDate } = req.body;

        const requestData = {
            url: process.env.RESTLET_URL,
            method: 'POST'
        };

        // Generate OAuth headers
        const authData = oauth.authorize(requestData, token);
        const authHeaders = oauth.toHeader(authData);
        
        // Add NetSuite realm to Authorization header
        const authHeader = authHeaders['Authorization'].replace(
            'OAuth ',
            `OAuth realm="${process.env.NETSUITE_REALM}",`
        );
        
        const headers = {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const postData = {
            projectName,
            customerId,
            startDate,
            endDate
        };

        console.log('Creating project in NetSuite:', postData);

        // Call NetSuite RESTlet
        const response = await axios.post(process.env.RESTLET_URL, postData, { headers });

        console.log('NetSuite Response:', response.data);

        res.json(response.data);

    } catch (error) {
        console.error('Error creating project:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data?.message || error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
🚀 NetSuite Customer Portal Server Running!

📍 Server:     http://localhost:${PORT}
📊 API Health: http://localhost:${PORT}/api/health
🔗 Portal:     http://localhost:${PORT}

NetSuite Account: ${process.env.NETSUITE_ACCOUNT_ID}
Environment: ${process.env.NODE_ENV || 'development'}

Ready to serve project data! 🎉
    `);
});


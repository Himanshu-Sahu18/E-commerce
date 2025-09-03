# Deployment Guide

This guide provides step-by-step instructions for deploying your MERN e-commerce application to free hosting services.

## Prerequisites

- GitHub account
- MongoDB Atlas account (free)
- Render account (free)
- Vercel account (free)

## 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user:

   - Go to Database Access
   - Add New Database User
   - Choose Password authentication
   - Set username and password
   - Grant "Read and write to any database" role

4. Whitelist IP addresses:

   - Go to Network Access
   - Add IP Address
   - Choose "Allow access from anywhere" (0.0.0.0/0) for development

5. Get connection string:
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## 2. Backend Deployment (Render)

1. Push your code to GitHub
2. Go to [Render](https://render.com) and sign up
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:

   - **Name**: `your-app-name-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

6. Add Environment Variables:

   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   JWT_EXPIRE=30d
   ```

7. Click "Create Web Service"
8. Wait for deployment to complete
9. Note your backend URL (e.g., `https://your-app-name-api.onrender.com`)

## 3. Seed Database

Once your backend is deployed:

1. Go to your Render dashboard
2. Open your web service
3. Go to "Shell" tab
4. Run: `node scripts/seedData.js`

Or use a tool like Postman to make API calls to seed data.

## 4. Frontend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Configure:

   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. Add Environment Variable:

   - `REACT_APP_API_URL`: Your Render backend URL

6. Deploy the project
7. Your frontend will be available at `https://your-app-name.vercel.app`

## 5. Update Frontend API Configuration

Update your frontend to use the production API URL:

In `client/src/context/AuthContext.js` and `client/src/context/CartContext.js`, update axios calls to use:

```javascript
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
```

Then use `${API_URL}/api/...` for all API calls.

## 6. Test Your Deployment

1. Visit your Vercel frontend URL
2. Test user registration and login
3. Test product browsing and cart functionality
4. Test admin features with admin credentials

## Alternative: Netlify for Frontend

If you prefer Netlify over Vercel:

1. Build your React app: `cd client && npm run build`
2. Go to [Netlify](https://netlify.com)
3. Drag and drop the `build` folder
4. Configure redirects by adding `_redirects` file in `public` folder:
   ```
   /*    /index.html   200
   ```

## Alternative: Heroku for Backend

If you prefer Heroku over Render:

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name-api`
4. Set environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   ```
5. Deploy: `git subtree push --prefix server heroku main`

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your backend allows requests from your frontend domain
2. **Environment Variables**: Double-check all environment variables are set correctly
3. **Database Connection**: Ensure MongoDB Atlas IP whitelist includes your hosting provider
4. **Build Failures**: Check that all dependencies are listed in package.json

### Debugging:

1. Check Render logs for backend errors
2. Check browser console for frontend errors
3. Use network tab to inspect API calls
4. Verify environment variables are loaded correctly

## Security Considerations for Production

1. Use strong JWT secrets
2. Enable HTTPS (automatically handled by Render/Vercel)
3. Implement rate limiting
4. Validate all inputs
5. Use CORS properly
6. Keep dependencies updated

## Monitoring and Maintenance

1. Monitor application logs regularly
2. Set up uptime monitoring
3. Keep dependencies updated
4. Backup your database regularly
5. Monitor performance metrics

Your MERN e-commerce application should now be fully deployed and accessible to users worldwide!

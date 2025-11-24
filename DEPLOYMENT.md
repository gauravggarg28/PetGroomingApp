# Deployment Guide - Launching Your Website from GitHub

This guide will help you deploy your Pet Grooming app so it's accessible online. Since your app has both a frontend (React) and backend (Node.js/Express), you'll need to deploy them separately.

## Overview

- **Frontend**: React app (static files) → Deploy to GitHub Pages, Vercel, or Netlify
- **Backend**: Node.js/Express API → Deploy to Render, Railway, Heroku, or Vercel

---

## Option 1: GitHub Pages (Frontend) + Render (Backend) - Recommended for Free Hosting

### Step 1: Deploy Backend to Render (Free Tier Available)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Create a Render account**:
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

3. **Create a new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository: `PetGroomingApp`
   - Configure:
     - **Name**: `pet-grooming-api` (or any name)
     - **Root Directory**: `server`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `node index.js`
     - **Plan**: Free (or choose a paid plan)

4. **Add Environment Variables** (if needed):
   - `PORT`: `3001` (or leave default)
   - `NODE_ENV`: `production`

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - **Copy your backend URL** (e.g., `https://pet-grooming-api.onrender.com`)

### Step 2: Update Frontend to Use Production API

1. **Create an API configuration file** in `client/src/utils/api.js`:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
   
   export const api = {
     baseURL: API_BASE_URL,
     get: async (endpoint) => {
       const response = await fetch(`${API_BASE_URL}${endpoint}`);
       return response.json();
     },
     post: async (endpoint, data) => {
       const response = await fetch(`${API_BASE_URL}${endpoint}`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data),
       });
       return response.json();
     },
   };
   ```

   **OR** update `vite.config.js` to use environment variable:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     server: {
       port: 3000,
       proxy: {
         '/api': {
           target: import.meta.env.VITE_API_URL || 'http://localhost:3001',
           changeOrigin: true,
         },
       },
     },
   });
   ```

2. **Create `.env.production` file** in `client/` directory:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

3. **Update axios calls** to use the API base URL, or create an axios instance:
   ```javascript
   // client/src/utils/axios.js
   import axios from 'axios';
   
   const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
   });
   
   export default api;
   ```

### Step 3: Deploy Frontend to GitHub Pages

1. **Update `vite.config.js`** for GitHub Pages:
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/PetGroomingApp/', // Replace with your repository name
     server: {
       port: 3000,
       proxy: {
         '/api': {
           target: import.meta.env.VITE_API_URL || 'http://localhost:3001',
           changeOrigin: true,
         },
       },
     },
   })
   ```

2. **Install GitHub Pages plugin**:
   ```bash
   cd client
   npm install --save-dev gh-pages
   ```

3. **Update `client/package.json`**:
   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview",
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

4. **Deploy**:
   ```bash
   cd client
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your GitHub repository
   - Settings → Pages
   - Source: Select `gh-pages` branch
   - Your site will be at: `https://gauravggarg28.github.io/PetGroomingApp/`

---

## Option 2: Vercel (Full-Stack Deployment) - Easiest Option

Vercel can deploy both frontend and backend, but requires some adjustments.

### Step 1: Deploy Backend to Vercel

1. **Create `vercel.json`** in the root:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server/index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "server/index.js"
       }
     ]
   }
   ```

2. **Update server to work with Vercel**:
   - Vercel uses serverless functions, so you may need to adjust the server code
   - Or use Vercel's API routes structure

### Step 2: Deploy Frontend to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd client
   vercel
   ```

3. **Configure environment variables** in Vercel dashboard:
   - `VITE_API_URL`: Your backend URL
   - `VITE_GOOGLE_MAPS_API_KEY`: Your Google Maps key

---

## Option 3: Netlify (Frontend) + Railway (Backend)

### Frontend on Netlify:

1. **Build settings**:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`

2. **Environment variables**:
   - `VITE_API_URL`: Your backend URL
   - `VITE_GOOGLE_MAPS_API_KEY`: Your Google Maps key

### Backend on Railway:

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repository
4. Set root directory to `server`
5. Railway auto-detects Node.js and deploys

---

## Quick Start: Simplest Deployment

For the quickest deployment, use **Render for backend** and **GitHub Pages for frontend**:

### Backend (Render):
1. Sign up at render.com
2. New Web Service → Connect GitHub → Select repo
3. Root Directory: `server`
4. Build: `npm install`
5. Start: `node index.js`
6. Copy the URL (e.g., `https://pet-grooming-api.onrender.com`)

### Frontend (GitHub Pages):
1. Update `client/vite.config.js` with `base: '/PetGroomingApp/'`
2. Create `client/.env.production` with `VITE_API_URL=https://your-backend-url.onrender.com`
3. Install gh-pages: `npm install --save-dev gh-pages` (in client folder)
4. Add to `client/package.json`: `"deploy": "npm run build && gh-pages -d dist"`
5. Run: `cd client && npm run deploy`
6. Enable GitHub Pages in repo settings (gh-pages branch)

---

## Important Notes

1. **CORS**: Your backend already has CORS enabled, which is good for production.

2. **API URL**: Make sure to update all API calls to use the production backend URL instead of `localhost:3001`.

3. **Environment Variables**: Never commit `.env` files with sensitive keys. Use the hosting platform's environment variable settings.

4. **Google Maps API**: 
   - Add your production domain to allowed origins in Google Cloud Console
   - Update API key restrictions if needed

5. **Data Persistence**: The current JSON file storage will reset on each deployment. Consider migrating to a database (MongoDB, PostgreSQL) for production.

---

## Testing Your Deployment

1. **Test Backend**: Visit `https://your-backend-url.onrender.com/api/services`
   - Should return JSON array of services

2. **Test Frontend**: Visit your GitHub Pages URL
   - Should load the React app
   - Try registering a customer
   - Try booking a service

---

## Troubleshooting

- **404 errors**: Check that `base` path in `vite.config.js` matches your repository name
- **API not working**: Verify `VITE_API_URL` is set correctly in production
- **CORS errors**: Ensure backend CORS allows your frontend domain
- **Build fails**: Check that all dependencies are in `package.json`

---

## Next Steps

After deployment:
1. Set up a custom domain (optional)
2. Migrate to a database for persistent data storage
3. Add error monitoring (Sentry, etc.)
4. Set up CI/CD for automatic deployments


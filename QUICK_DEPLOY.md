# Quick Deployment Guide

Follow these steps to get your website live from GitHub:

## Step 1: Deploy Backend (5 minutes)

1. **Go to [Render.com](https://render.com)** and sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `PetGroomingApp`
4. Configure:
   - **Name**: `pet-grooming-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Plan**: Free
5. Click **"Create Web Service"**
6. **Wait for deployment** (2-3 minutes)
7. **Copy your backend URL** (e.g., `https://pet-grooming-api.onrender.com`)

## Step 2: Configure Frontend

1. **Create `.env.production` file** in the `client/` folder:
   ```bash
   cd client
   ```
   
   Create file `.env.production` with:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```
   
   Replace `your-backend-url.onrender.com` with the URL from Step 1.

2. **Update `vite.config.js`** if your GitHub repo name is different:
   - Open `client/vite.config.js`
   - Change `base: '/PetGroomingApp/'` to match your repository name

## Step 3: Deploy Frontend to GitHub Pages

1. **Install gh-pages**:
   ```bash
   cd client
   npm install --save-dev gh-pages
   ```

2. **Deploy**:
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages**:
   - Go to your GitHub repository: https://github.com/gauravggarg28/PetGroomingApp
   - Click **Settings** → **Pages**
   - Under **Source**, select **`gh-pages`** branch
   - Click **Save**

4. **Your website is live!** 
   - URL: `https://gauravggarg28.github.io/PetGroomingApp/`

## Troubleshooting

- **404 errors**: Make sure the `base` path in `vite.config.js` matches your repository name
- **API not working**: Check that `VITE_API_URL` in `.env.production` is correct
- **Build fails**: Run `npm install` in the `client` folder first

## Next Steps

- Test your deployed website
- Update Google Maps API key restrictions to allow your GitHub Pages domain
- Consider migrating to a database for persistent data storage


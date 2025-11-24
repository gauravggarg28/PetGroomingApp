# Execute Deployment - Step by Step

## ✅ What's Already Done

1. ✅ Code updated for production deployment
2. ✅ API configuration created (`client/src/utils/api.js`)
3. ✅ All pages updated to use production API
4. ✅ Vite config updated for GitHub Pages
5. ✅ gh-pages installed
6. ✅ Build tested and working
7. ✅ Deployment script created (`deploy.sh`)
8. ✅ Changes committed locally

## 🚀 Next Steps to Execute Deployment

### Step 1: Push Code to GitHub

You need to authenticate and push:

```bash
git push origin main
```

If you get authentication errors, use a Personal Access Token:
- Go to: https://github.com/settings/tokens
- Generate new token (classic) with `repo` scope
- Use token as password when pushing

### Step 2: Deploy Backend to Render

**Option A: Use Render Dashboard (Easiest)**
1. Go to https://render.com
2. Sign up/login with GitHub
3. Click "New +" → "Web Service"
4. Connect repository: `PetGroomingApp`
5. Configure:
   - **Name**: `pet-grooming-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Plan**: Free
6. Click "Create Web Service"
7. Wait 2-3 minutes for deployment
8. **Copy the URL** (e.g., `https://pet-grooming-api.onrender.com`)

**Option B: Use Render CLI** (if installed)
```bash
render deploy
```

### Step 3: Configure Frontend Environment

Create `client/.env.production` file:

```bash
cd client
cat > .env.production << 'EOF'
VITE_API_URL=https://your-backend-url.onrender.com
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
EOF
```

Replace:
- `your-backend-url.onrender.com` with your actual Render URL from Step 2
- `your_google_maps_api_key_here` with your Google Maps API key

### Step 4: Deploy Frontend to GitHub Pages

**Option A: Use the deployment script**
```bash
cd "/Users/gauravgarg/Pet Grooming Project "
./deploy.sh
```

**Option B: Manual deployment**
```bash
cd client
npm run deploy
```

### Step 5: Enable GitHub Pages

1. Go to: https://github.com/gauravggarg28/PetGroomingApp/settings/pages
2. Under "Source", select **`gh-pages`** branch
3. Click **Save**
4. Wait 1-2 minutes

### Step 6: Verify Deployment

Your site will be live at:
**https://gauravggarg28.github.io/PetGroomingApp/**

Test:
- ✅ Homepage loads
- ✅ Services page shows services (tests backend connection)
- ✅ Registration form works
- ✅ Google Maps picker works (if API key is set)

## 🔧 Quick Commands Reference

```bash
# Push to GitHub (after authentication)
git push origin main

# Deploy frontend (after setting .env.production)
cd client && npm run deploy

# Or use the automated script
./deploy.sh
```

## ⚠️ Important Notes

1. **Backend URL**: Make sure your Render backend URL is accessible and CORS is enabled (already configured in your server)

2. **Google Maps API**: 
   - Add `https://gauravggarg28.github.io` to allowed origins in Google Cloud Console
   - Or use an unrestricted key for testing (not recommended for production)

3. **Environment Variables**: 
   - `.env.production` is for production builds
   - Don't commit `.env.production` with real keys to GitHub (add to .gitignore)

4. **Repository Name**: If your GitHub repo name is different from `PetGroomingApp`, update `base` in `client/vite.config.js`

## 🐛 Troubleshooting

**Build fails:**
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Deployment fails:**
- Check that gh-pages is installed: `npm list gh-pages`
- Verify .env.production exists and has correct values
- Check GitHub authentication

**API not working:**
- Verify backend URL in .env.production
- Test backend directly: `curl https://your-backend-url.onrender.com/api/services`
- Check browser console for CORS errors

**404 errors on GitHub Pages:**
- Verify `base` path in vite.config.js matches repository name
- Clear browser cache
- Wait a few minutes for GitHub Pages to update

## 📞 Need Help?

Check the detailed guides:
- `QUICK_DEPLOY.md` - Quick reference
- `DEPLOYMENT.md` - Comprehensive deployment options


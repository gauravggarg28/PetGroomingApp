# Final Deployment Steps

## ✅ What's Already Done

1. ✅ Code prepared for production
2. ✅ Build tested and working
3. ✅ gh-pages installed
4. ✅ .env.production template created
5. ✅ All deployment scripts created

## 🚀 Complete the Deployment (2 Steps)

### Step 1: Get Your Render Backend URL

1. Go to **https://dashboard.render.com**
2. Click on your **web service** (the one you created)
3. **Copy the URL** shown at the top (e.g., `https://pet-grooming-api.onrender.com`)

### Step 2: Deploy Frontend

**Option A: Using the automated script (Recommended)**

```bash
# Update .env.production with your Render URL first
cd client
echo "VITE_API_URL=https://YOUR_RENDER_URL.onrender.com" > .env.production
echo "VITE_GOOGLE_MAPS_API_KEY=your_key_here" >> .env.production

# Then deploy
npm run deploy
```

When prompted for GitHub credentials:
- **Username**: `gauravggarg28`
- **Password**: Use a **Personal Access Token** (not your GitHub password)
  - Get token from: https://github.com/settings/tokens
  - Create new token (classic) with `repo` scope
  - Copy and paste as password

**Option B: Using the helper script**

```bash
./deploy-with-url.sh https://YOUR_RENDER_URL.onrender.com
```

### Step 3: Enable GitHub Pages

1. Go to: **https://github.com/gauravggarg28/PetGroomingApp/settings/pages**
2. Under **"Source"**, select **`gh-pages`** branch
3. Click **Save**
4. Wait 1-2 minutes

### Step 4: Your Site is Live! 🎉

Visit: **https://gauravggarg28.github.io/PetGroomingApp/**

## 🔑 Getting GitHub Personal Access Token

If you need to authenticate:

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `PetGroomingDeployment`
4. Select scope: **`repo`** (full control)
5. Click **"Generate token"**
6. **Copy the token immediately** (you won't see it again!)
7. Use this token as your password when deploying

## 📝 Quick Command Reference

```bash
# 1. Update backend URL
cd client
cat > .env.production << EOF
VITE_API_URL=https://your-render-url.onrender.com
VITE_GOOGLE_MAPS_API_KEY=your_key_here
EOF

# 2. Deploy (will prompt for GitHub credentials)
npm run deploy

# 3. Enable GitHub Pages in repo settings
```

## ✅ Verification Checklist

- [ ] Render backend is deployed and accessible
- [ ] Backend URL added to `.env.production`
- [ ] Frontend deployed to GitHub Pages (gh-pages branch)
- [ ] GitHub Pages enabled in repository settings
- [ ] Site accessible at GitHub Pages URL
- [ ] API calls working (test by visiting Services page)

## 🐛 Troubleshooting

**"Device not configured" error:**
- Use Personal Access Token as password (not GitHub password)
- Or configure git credentials: `git config --global credential.helper osxkeychain`

**API not working:**
- Verify backend URL in `.env.production` is correct
- Test backend: `curl https://your-backend-url.onrender.com/api/services`
- Rebuild and redeploy: `npm run deploy`

**404 errors:**
- Check `base` path in `vite.config.js` matches repository name
- Clear browser cache
- Wait a few minutes for GitHub Pages to update


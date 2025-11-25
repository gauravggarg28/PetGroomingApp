# Render Deployment Setup Guide

## ✅ Server Code Status
- ✅ Server syntax is valid
- ✅ Server runs locally successfully
- ✅ All dependencies are correct
- ✅ Port binding is correct (0.0.0.0)

## 🔧 Render Configuration Steps

### Step 1: Check Your Render Service Settings

Go to: https://dashboard.render.com/web/srv-d4i3nbogjchc73dkhc00/settings

**Verify these settings:**

1. **Name**: `pet-grooming-api` (or your service name)
2. **Root Directory**: `server` ⚠️ **CRITICAL - Must be `server`**
3. **Environment**: `Node`
4. **Build Command**: `npm install`
5. **Start Command**: `node index.js`
6. **Plan**: Free (or your plan)

### Step 2: Check Environment Variables

In Render dashboard → Environment:
- No environment variables needed (PORT is set automatically)
- Optional: Add `NODE_ENV=production` if you want

### Step 3: Check Deployment Logs

1. Go to your service dashboard
2. Click on "Logs" tab
3. Look for error messages

**Common error messages and fixes:**

#### "Cannot find module"
- **Fix**: Make sure Root Directory is set to `server`
- **Fix**: Verify `package.json` exists in `server/` folder

#### "Port already in use"
- **Fix**: Already handled - we use `process.env.PORT`

#### "Build failed"
- **Fix**: Check if `npm install` completes
- **Fix**: Verify all dependencies are in `dependencies` (not `devDependencies`)

#### "Service failed to start"
- **Fix**: Check Start Command is exactly: `node index.js`
- **Fix**: Verify Root Directory is `server`

### Step 4: Manual Redeploy

If deployment failed:
1. In Render dashboard, click "Manual Deploy"
2. Select "Deploy latest commit"
3. Watch the logs

### Step 5: Verify Deployment

After successful deployment:
```bash
curl https://petgroomingapp.onrender.com/health
```

Should return: `{"status":"ok","message":"Server is running"}`

## 📋 Render Configuration Checklist

- [ ] Root Directory: `server` (not empty, not `/server`)
- [ ] Build Command: `npm install`
- [ ] Start Command: `node index.js`
- [ ] Environment: `Node`
- [ ] Auto-Deploy: Enabled (from GitHub)

## 🐛 Troubleshooting

### If deployment keeps failing:

1. **Delete and recreate the service**:
   - Delete current service in Render
   - Create new Web Service
   - Connect same GitHub repo
   - Set Root Directory to `server`
   - Set Build: `npm install`
   - Set Start: `node index.js`

2. **Check GitHub connection**:
   - Verify Render is connected to your GitHub repo
   - Check that it's watching the `main` branch

3. **Check file structure**:
   ```
   PetGroomingApp/
   ├── server/
   │   ├── index.js
   │   ├── package.json
   │   └── data/ (auto-created)
   └── client/
   ```

## 📞 Need Help?

**Share the exact error message from Render logs** and I can help fix it!

Common places to find errors:
- Render Dashboard → Your Service → Logs tab
- Build logs (during deployment)
- Runtime logs (after deployment)


# Render Deployment Fix

## Common Render Deployment Issues

### 1. Check Render Dashboard Logs
The most important step is to check the deployment logs in Render dashboard:
1. Go to https://dashboard.render.com
2. Click on your service
3. Go to "Logs" tab
4. Look for error messages

### 2. Verify Render Configuration

Make sure your Render service has these settings:

**Settings:**
- **Root Directory**: `server`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node index.js`
- **Plan**: Free (or your chosen plan)

**Environment Variables:**
- `NODE_ENV`: `production` (optional)
- `PORT`: Will be set automatically by Render

### 3. Common Issues and Fixes

#### Issue: "Build failed"
**Solution:**
- Check if `package.json` has all dependencies
- Verify `npm install` completes successfully
- Check build logs for missing packages

#### Issue: "Service failed to start"
**Solution:**
- Verify `startCommand` is `node index.js`
- Check that server binds to `0.0.0.0` (already fixed)
- Verify PORT environment variable is used

#### Issue: "Module not found"
**Solution:**
- Ensure all dependencies are in `dependencies` not `devDependencies`
- Run `npm install` locally to verify

#### Issue: "Port already in use"
**Solution:**
- Render sets PORT automatically, don't hardcode it
- Use `process.env.PORT || 3001` (already done)

### 4. Manual Redeploy

If deployment fails:
1. Go to Render dashboard
2. Click on your service
3. Click "Manual Deploy"
4. Select "Deploy latest commit"
5. Watch the logs for errors

### 5. Verify Deployment

After deployment, test:
```bash
curl https://petgroomingapp.onrender.com/health
```

Should return: `{"status":"ok","message":"Server is running"}`

## Current Server Configuration

✅ **Root Directory**: `server`
✅ **Build Command**: `npm install`
✅ **Start Command**: `node index.js`
✅ **Port Binding**: `0.0.0.0` (correct for Render)
✅ **Health Endpoint**: `/health` (for monitoring)

## If Still Failing

1. **Check the exact error message** from Render logs
2. **Share the error** and I can help fix it
3. **Common fixes**:
   - Missing dependencies → Add to package.json
   - Syntax errors → Check server/index.js
   - Port issues → Already fixed
   - File permissions → Should be automatic

## Quick Test Locally

To test if server works locally:
```bash
cd server
npm install
node index.js
```

Then test: `curl http://localhost:3001/health`

If this works, the server code is fine and the issue is with Render configuration.


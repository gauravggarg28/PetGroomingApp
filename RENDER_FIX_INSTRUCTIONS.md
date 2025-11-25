# Render Deployment Fix - Step by Step

## Error: "cannot find module /opt/render/project/src/server/install"

This error means Render is looking in the wrong directory. Here's how to fix it:

## ✅ Solution: Update Render Dashboard Settings

### Step 1: Go to Render Dashboard Settings

1. Go to: https://dashboard.render.com/web/srv-d4i3nbogjchc73dkhc00/settings
2. Scroll down to "Build & Deploy" section

### Step 2: Update These Settings EXACTLY:

**Root Directory:**
```
server
```
⚠️ **IMPORTANT**: Just type `server` (no slash, no quotes, no spaces)

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```
OR
```
node index.js
```

**Environment:**
```
Node
```

### Step 3: Save and Redeploy

1. Click **"Save Changes"** at the bottom
2. Go to "Events" tab
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. Watch the logs

## 🔍 Alternative: Delete and Recreate Service

If the above doesn't work:

1. **Delete the current service** in Render dashboard
2. **Create a new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `PetGroomingApp`
   - Configure:
     - **Name**: `pet-grooming-api`
     - **Root Directory**: `server` ⚠️ **CRITICAL**
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free
   - Click "Create Web Service"

## ✅ Verify Settings

After updating, your settings should look like:

```
Name: pet-grooming-api
Root Directory: server
Environment: Node
Build Command: npm install
Start Command: npm start
Auto-Deploy: Yes
Branch: main
```

## 📋 What Changed

I've updated:
- ✅ `package.json` - Added engines field
- ✅ `render.yaml` - Updated configuration
- ✅ Server code - Improved error handling

## 🧪 Test After Deployment

Once deployed, test:
```bash
curl https://petgroomingapp.onrender.com/health
```

Should return: `{"status":"ok","message":"Server is running"}`

## ⚠️ Most Common Mistake

**Root Directory must be exactly**: `server`

NOT:
- ❌ `/server`
- ❌ `./server`
- ❌ `server/`
- ❌ (empty)

✅ **Correct**: `server`


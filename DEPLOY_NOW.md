# 🚀 DEPLOY YOUR WEBSITE NOW - Step by Step

## ✅ Your Repository
**GitHub Repository**: https://github.com/abhinavsanthoshpp/youtube_website.git

---

## 📋 Follow These Exact Steps

### Step 1: Push Your Code to GitHub (2 minutes)

Open terminal and run these commands:

```bash
cd /home/abhinav-santhosh/Documents/youtube_website

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - YouTube Downloader by Abhinav"

# Connect to your GitHub repository
git remote add origin https://github.com/abhinavsanthoshpp/youtube_website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

✅ Your code is now on GitHub!

---

### Step 2: Deploy Backend to Railway (2 minutes)

1. **Open Railway**: Go to https://railway.app

2. **Sign Up**: Click "Login" → "Login with GitHub" → Authorize Railway

3. **Create New Project**:
   - Click "New Project"
   - Click "Deploy from GitHub repo"
   - Select **"youtube_website"** from the list
   - Railway will automatically detect and deploy

4. **Configure Backend**:
   - Click on the deployed service
   - Go to **"Settings"** tab
   - Scroll to **"Root Directory"**
   - Enter: `backend`
   - Click "Save"

5. **Add Environment Variables**:
   - Go to **"Variables"** tab
   - Click "New Variable"
   - Add these:
     ```
     NODE_ENV=production
     FRONTEND_URL=*
     ```
   - Service will automatically redeploy

6. **Get Your Backend URL**:
   - Go to **"Settings"** tab
   - Under "Domains" you'll see something like:
     `https://youtube-website-production-xxxx.up.railway.app`
   - **Copy this URL** - you'll need it for Step 3!

✅ Backend is live! Copy the Railway URL before moving to Step 3.

---

### Step 3: Deploy Frontend to Vercel (2 minutes)

1. **Open Vercel**: Go to https://vercel.com

2. **Sign Up**: Click "Sign Up" → "Continue with GitHub" → Authorize Vercel

3. **Import Repository**:
   - Click "Add New..." → "Project"
   - Find **"youtube_website"** in the list
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Select "Vite"
   - **Root Directory**: Leave as "./"
   - **Build Command**: Leave as "npm run build"
   - **Output Directory**: Leave as "dist"

5. **Add Environment Variable**:
   - Click "Environment Variables" section
   - Add this variable:
     ```
     Name: VITE_API_URL
     Value: <paste your Railway URL here>
     ```
     Example: `https://youtube-website-production-xxxx.up.railway.app`
   
6. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes for build to complete
   - You'll get a URL like: `https://youtube-website-xxxx.vercel.app`

✅ Frontend is live! Copy the Vercel URL for Step 4.

---

### Step 4: Update Backend CORS (1 minute)

1. **Go Back to Railway**: Open https://railway.app

2. **Select Your Project**: Click on your youtube_website project

3. **Update Environment Variable**:
   - Go to **"Variables"** tab
   - Find `FRONTEND_URL` variable
   - Click to edit
   - Change from `*` to your Vercel URL:
     ```
     FRONTEND_URL=https://youtube-website-xxxx.vercel.app
     ```
     (Use your actual Vercel URL from Step 3)
   - Save

4. **Wait for Redeploy**: Railway will automatically redeploy (takes ~30 seconds)

✅ CORS is configured!

---

### Step 5: Test Your Live Website! 🎉

1. **Open Your Website**: Go to your Vercel URL:
   ```
   https://youtube-website-xxxx.vercel.app
   ```

2. **Test Download**:
   - Paste this YouTube URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Click "Analyze Link"
   - Wait for video info to load
   - Select quality (e.g., "1080p")
   - Click "Download Video"
   - Video should download to your computer!

3. **If It Works**: 🎊 Congratulations! Your website is live!

4. **If There's an Error**: See troubleshooting below

---

## 🐛 Troubleshooting

### Error: "Failed to fetch video info"

**Check:**
1. Open Railway → Your Project → "Deployments"
2. Click latest deployment → "View Logs"
3. Look for errors

**Common fixes:**
- Make sure Root Directory is set to `backend` in Railway
- Verify `VITE_API_URL` in Vercel matches your Railway URL exactly
- Check that Railway deployment succeeded (green checkmark)

### Error: CORS blocked in browser console

**Fix:**
1. Open Railway → Variables
2. Make sure `FRONTEND_URL` has your exact Vercel URL
3. No trailing slash: ✅ `https://xyz.vercel.app` ❌ `https://xyz.vercel.app/`
4. Wait 30 seconds for Railway to redeploy

### Error: "Cannot GET /" on Railway URL

**This is normal!** Your backend API doesn't have a homepage.
- Try: `https://your-railway-url.railway.app/api/health`
- You should see: `{"status":"ok","timestamp":"..."}`

### Video download fails

**Try:**
1. Use a different YouTube video URL
2. Check Railway logs for errors
3. Make sure video is not age-restricted or private
4. Update ytdl-core: 
   ```bash
   cd backend
   npm update ytdl-core
   git add .
   git commit -m "Update ytdl-core"
   git push
   ```

---

## 🎊 Success! Your URLs

Once deployed, save these URLs:

- **🌐 Your Live Website**: `https://your-project.vercel.app`
- **🔌 Your Backend API**: `https://your-project.railway.app`

Share your website URL with friends!

---

## 💡 Pro Tips

### Free Tier Monitoring

**Railway:**
- Dashboard shows credit usage
- $5/month free credit
- Covers ~500 hours (plenty for personal use)

**Vercel:**
- Dashboard shows bandwidth usage
- 100GB/month free
- More than enough for most projects

### Automatic Deployments

Both Railway and Vercel auto-deploy when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Add new feature"
git push

# Both platforms will automatically redeploy!
```

### Custom Domain (Optional)

**Vercel:**
1. Go to Project → Settings → Domains
2. Add your domain (e.g., `ytdownloader.com`)
3. Follow DNS setup instructions

**Railway:**
1. Go to Settings → Domains
2. Add custom domain
3. Update DNS records

---

## 🎓 What You Just Did

✅ Deployed a full-stack application
✅ Backend API on Railway (Node.js + Express)
✅ Frontend on Vercel (React + TypeScript + Vite)
✅ Configured environment variables
✅ Set up CORS for security
✅ Made it accessible to anyone on the internet!

This is **production-ready** code that:
- Handles real YouTube downloads
- Has rate limiting (100 req/15min)
- Includes security headers
- Has error handling
- Uses environment variables
- Is fully scalable

---

## 📱 Share Your Website

Your website is now live! Share it:

```
"Check out my YouTube downloader website I built:
https://your-project.vercel.app

Made by Abhinav ❤️"
```

---

## 🆘 Need More Help?

- **Quick Guide**: `QUICK_DEPLOY.md`
- **Complete Guide**: `DEPLOYMENT_GUIDE.md`
- **API Docs**: `backend/README.md`
- **Setup Guide**: `SETUP_GUIDE.md`

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed on Railway
- [ ] Root directory set to `backend`
- [ ] Backend environment variables added
- [ ] Backend URL copied
- [ ] Frontend deployed on Vercel
- [ ] Frontend environment variable added
- [ ] Backend CORS updated with Vercel URL
- [ ] Website tested with real YouTube URL
- [ ] Video download works
- [ ] URLs saved for future reference
- [ ] Website shared with friends! 🎉

---

**Made by Abhinav** ❤️

*Your YouTube downloader is now live and working perfectly!*

**Last updated**: October 30, 2025

# ⚡ Quick Deploy to Railway + Vercel (5 Minutes)

## 🎯 Fastest Way to Go Live

### Step 1: Push to GitHub (2 min)

```bash
# In your project folder
cd /home/abhinav-santhosh/Documents/youtube_website

# Initialize git
git init
git add .
git commit -m "Initial commit - YouTube Downloader"

# Push to your GitHub repository:
git remote add origin https://github.com/abhinavsanthoshpp/youtube_website.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Railway (1 min)

1. Go to [railway.app](https://railway.app) → Sign up with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your **youtube_website** repository
4. Click on the deployed service
5. Go to **Settings** → Set **Root Directory** to: `backend`
6. Go to **Variables** → Add:
   ```
   NODE_ENV=production
   FRONTEND_URL=*
   ```
7. Copy your Railway URL (looks like: `https://something.railway.app`)

### Step 3: Deploy Frontend to Vercel (1 min)

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"Add New"** → **"Project"**
3. Import your **youtube_website** repository
4. Set **Framework Preset**: Vite
5. Add **Environment Variable**:
   ```
   VITE_API_URL=https://your-railway-url.railway.app
   ```
   (Paste the Railway URL from Step 2)
6. Click **"Deploy"**
7. Copy your Vercel URL (looks like: `https://something.vercel.app`)

### Step 4: Update Backend CORS (30 sec)

1. Go back to Railway
2. Go to **Variables**
3. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://your-vercel-url.vercel.app
   ```
4. Service will auto-redeploy

### Step 5: Test Your Live Website! 🎉

1. Open your Vercel URL in browser
2. Paste a YouTube URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
3. Click "Analyze Link"
4. Select quality and click "Download"
5. Video should download! ✅

---

## 🔗 Your Live URLs

- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://your-project.railway.app`

---

## 🐛 Quick Troubleshooting

**Problem: "Failed to fetch video info"**
- Check Railway logs for errors
- Verify `VITE_API_URL` in Vercel environment variables
- Ensure `FRONTEND_URL` is set correctly in Railway

**Problem: CORS error in browser console**
- Update `FRONTEND_URL` in Railway with your exact Vercel URL
- Wait 30 seconds for Railway to redeploy

**Problem: Video download fails**
- Check Railway logs
- Verify ytdl-core is installed (check Railway build logs)
- Try a different YouTube video URL

---

## 💡 Pro Tips

1. **Custom Domain**: Go to Vercel → Settings → Domains → Add your domain
2. **View Logs**: Railway → Deployments → View Logs (for debugging)
3. **Redeploy**: If something breaks, push a new commit to GitHub
4. **Free Tier**: Railway gives $5/month credit (enough for ~500 hours)

---

## 🎊 You're Live!

Share your website with friends:
"Check out my YouTube downloader: https://your-project.vercel.app"

Made by Abhinav ❤️

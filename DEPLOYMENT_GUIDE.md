# 🌐 Production Deployment Guide - YouTube Downloader

## 🎯 Overview

This guide will help you deploy your YouTube downloader website to make it publicly accessible. We'll deploy:
- **Backend API** → Railway/Render (Free tier available)
- **Frontend** → Vercel/Netlify (Free tier available)

---

## 📋 Pre-Deployment Checklist

- [ ] GitHub account created
- [ ] Code pushed to GitHub repository
- [ ] Backend and Frontend tested locally
- [ ] Environment variables documented

---

## 🚀 Quick Deployment Steps

### **Option 1: Railway (Backend) + Vercel (Frontend) - RECOMMENDED**

#### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
cd /home/abhinav-santhosh/Documents/youtube_website
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - YouTube Downloader Full Stack"

# Push to your GitHub repository:
git remote add origin https://github.com/abhinavsanthoshpp/youtube_website.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy Backend to Railway

1. Go to [Railway.app](https://railway.app/)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect your backend

**Configure Environment Variables on Railway:**
- Click on your service → "Variables" tab
- Add these variables:
  ```
  NODE_ENV=production
  PORT=5000
  FRONTEND_URL=https://your-frontend-url.vercel.app
  ```

**Set Root Directory (Important!):**
- Go to Settings → "Root Directory"
- Set to: `backend`
- Save changes

6. Deploy! Railway will give you a URL like: `https://your-app.railway.app`

#### Step 3: Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com/)
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

**Add Environment Variable:**
- Click "Environment Variables"
- Add:
  ```
  VITE_API_URL=https://your-backend.railway.app
  ```
  (Use the Railway URL from Step 2)

6. Click "Deploy"!

#### Step 4: Update Backend CORS

After frontend is deployed, update Railway environment variable:
```
FRONTEND_URL=https://your-frontend-url.vercel.app
```

🎉 **Done!** Your website is now live!

---

## 🔄 Alternative: Option 2 - Render (Both Backend & Frontend)

### Deploy Backend to Render

1. Go to [Render.com](https://render.com/)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Configure:
   - **Name**: youtube-downloader-api
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

**Environment Variables:**
```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend.onrender.com
```

### Deploy Frontend to Render

1. Click "New" → "Static Site"
2. Connect same repository
3. Configure:
   - **Name**: youtube-downloader
   - **Root Directory**: `./`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

**Environment Variables:**
```
VITE_API_URL=https://your-backend.onrender.com
```

---

## ⚙️ Production Configuration Files

### Create Production Backend Config

Create `backend/ecosystem.config.js` for PM2:

```javascript
module.exports = {
  apps: [{
    name: 'youtube-downloader-api',
    script: './server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

### Update Backend for Production

Add this to `backend/server.js` (after all routes):

```javascript
// Health check for deployment platforms
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'YouTube Downloader API is running',
    version: '1.0.0'
  });
});
```

---

## 🔒 Security Considerations

### 1. Rate Limiting (Already Configured ✅)
Your backend already has rate limiting:
- 100 requests per 15 minutes per IP

### 2. Environment Variables
Never commit these files:
- `.env`
- `.env.local`
- `.env.production`

### 3. CORS Configuration
Already configured to accept only your frontend domain.

### 4. API Key Protection (Optional Enhancement)

Add to `backend/server.js`:

```javascript
// Simple API key middleware (optional)
const API_KEY = process.env.API_KEY || 'your-secret-key';

const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Apply to protected routes
app.post('/api/info', validateApiKey, async (req, res) => {
  // ... existing code
});
```

---

## 📊 Monitoring & Maintenance

### Monitor Backend Health

All platforms provide:
- Real-time logs
- CPU/Memory usage
- Request metrics
- Error tracking

### Check Logs

**Railway:**
- Click on service → "Deployments" → "View Logs"

**Render:**
- Click on service → "Logs" tab

**Vercel:**
- Click on project → "Deployments" → Select deployment → "Logs"

---

## 🐛 Troubleshooting Deployment

### Problem: Frontend can't connect to backend

**Solution:**
1. Check CORS configuration in backend
2. Verify `FRONTEND_URL` environment variable
3. Ensure `VITE_API_URL` points to correct backend URL
4. Check browser console for CORS errors

### Problem: Backend crashes on startup

**Solution:**
1. Check logs for error messages
2. Verify all dependencies are installed
3. Ensure `PORT` environment variable is set
4. Check Node.js version (should be 18+)

### Problem: "Module not found" errors

**Solution:**
1. Clear build cache
2. Redeploy with fresh install:
   ```bash
   npm ci
   npm run build
   ```

### Problem: ytdl-core download fails

**Solution:**
1. Update ytdl-core to latest version:
   ```bash
   cd backend
   npm update ytdl-core
   ```
2. Add fallback error handling
3. Check YouTube's terms of service compliance

---

## 🚀 Performance Optimization

### 1. Enable Gzip Compression

Add to `backend/server.js`:

```javascript
const compression = require('compression');
app.use(compression());
```

Install: `npm install compression`

### 2. Cache Control Headers

```javascript
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
  next();
});
```

### 3. Frontend Build Optimization

Already configured in `vite.config.ts`:
- Code splitting ✅
- Minification ✅
- Tree shaking ✅

---

## 💰 Cost Breakdown

### Free Tier Limits

**Railway:**
- $5 credit/month (free forever)
- ~500 hours runtime
- Perfect for this project

**Render:**
- Free tier available
- Auto-sleep after 15 min inactivity
- Wakes up on request (slight delay)

**Vercel:**
- 100 GB bandwidth/month
- Unlimited websites
- Perfect for frontend

### Upgrade if Needed

If you get high traffic:
- Railway: $5-20/month
- Render: $7-25/month
- Vercel: $20/month (Pro)

---

## 🌟 Post-Deployment Steps

### 1. Test Everything

```bash
# Test backend
curl https://your-backend.railway.app/api/health

# Test frontend
# Open: https://your-frontend.vercel.app
# Try downloading a video
```

### 2. Share Your Website

Your live URLs:
- **Website**: `https://your-frontend.vercel.app`
- **API**: `https://your-backend.railway.app`

### 3. Set Up Custom Domain (Optional)

**Vercel:**
1. Go to project → "Settings" → "Domains"
2. Add your domain: `yourdomain.com`
3. Follow DNS configuration steps

**Railway:**
1. Go to service → "Settings" → "Domains"
2. Add custom domain
3. Update DNS records

---

## 📱 Progressive Web App (PWA) - Optional

Make your website installable:

1. Create `public/manifest.json`:

```json
{
  "name": "YouTube Downloader",
  "short_name": "YT Downloader",
  "description": "Download YouTube videos easily",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#FF0000",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

2. Link in `index.html`:
```html
<link rel="manifest" href="/manifest.json">
```

---

## 🎓 Learning Resources

- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

---

## ✅ Final Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] CORS updated with frontend URL
- [ ] Test download functionality
- [ ] Monitor logs for errors
- [ ] Share with friends! 🎉

---

## 🆘 Need Help?

Common issues:
1. **CORS errors**: Update `FRONTEND_URL` in backend env
2. **Build fails**: Check Node.js version (18+)
3. **Download fails**: Update ytdl-core package
4. **Slow performance**: Consider upgrading to paid tier

---

**Made by Abhinav** ❤️

*Last updated: October 2025*

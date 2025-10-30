# 🎬 Complete Setup Guide - YouTube Downloader Full Stack

## 📦 What You Need

- Node.js 18+ installed
- npm or yarn
- Modern web browser
- Internet connection

## 🚀 Installation Steps

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Install Frontend Dependencies

```bash
cd ..
npm install
```

### Step 3: Configure Environment Variables

**Backend (.env in /backend folder):**
```env
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env in root folder):**
```env
VITE_API_URL=http://localhost:5000
```

## ▶️ Running the Application

### Option 1: Run Both Separately (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option 2: Quick Start Script

Create `start.sh` in root:
```bash
#!/bin/bash
# Start backend
cd backend && npm start &
# Start frontend
cd .. && npm run dev
```

Then run:
```bash
chmod +x start.sh
./start.sh
```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

## ✅ Testing the Setup

1. Open http://localhost:5173
2. Paste a YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)
3. Click "Analyze"
4. Select quality and language
5. Click "Download Video"

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000
# Kill the process if needed
kill -9 <PID>
```

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `.env` file has correct `VITE_API_URL`
- Check browser console for CORS errors

### Downloads fail
- Verify YouTube URL is valid
- Check internet connection
- Try different video quality
- Check backend logs for errors

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)

1. Build frontend:
```bash
npm run build
```

2. Deploy `dist` folder to:
   - Vercel: https://vercel.com
   - Netlify: https://netlify.com

3. Update environment variables:
```env
VITE_API_URL=https://your-backend-url.com
```

### Backend (Heroku/Railway/Render)

1. Choose platform:
   - Heroku: https://heroku.com
   - Railway: https://railway.app
   - Render: https://render.com

2. Deploy backend folder

3. Update environment variables:
```env
PORT=<auto-assigned>
FRONTEND_URL=https://your-frontend-url.com
```

## 📝 Environment Variables Summary

| Variable | Location | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_URL` | Frontend | Backend API URL | http://localhost:5000 |
| `PORT` | Backend | Server port | 5000 |
| `FRONTEND_URL` | Backend | Frontend URL for CORS | http://localhost:5173 |

## 🎯 Features Checklist

- ✅ Real-time video information
- ✅ Multiple quality options
- ✅ Audio-only downloads
- ✅ Progress tracking
- ✅ Dark/Light mode
- ✅ Premium animations
- ✅ Rate limiting
- ✅ Error handling
- ✅ Responsive design

## 📞 Support

If you encounter issues:
1. Check logs in terminal
2. Verify all dependencies are installed
3. Ensure ports 5000 and 5173 are available
4. Check firewall settings
5. Verify YouTube URL is accessible

## ⚠️ Legal Notice

This application is for educational purposes only. Users are responsible for:
- Complying with YouTube Terms of Service
- Respecting copyright laws
- Having rights to download content

## 🎉 You're All Set!

Your YouTube Downloader is now ready to use!

Made with ❤️ by **Abhinav**
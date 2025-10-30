# 🚀 YouTube Downloader API - Backend

A high-performance Node.js/Express backend API for downloading YouTube videos with ytdl-core.

## 📋 Features

- ✅ Fast YouTube video downloads
- ✅ Multiple quality options (144p to 8K)
- ✅ Audio-only downloads
- ✅ Video information retrieval
- ✅ Rate limiting & security
- ✅ CORS enabled
- ✅ Error handling
- ✅ Progress tracking

## 🛠️ Tech Stack

- Node.js + Express
- ytdl-core (YouTube downloader)
- helmet (Security headers)
- cors (Cross-origin requests)
- express-rate-limit (Rate limiting)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create a `.env` file:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 3. Start Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on http://localhost:5000

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "YouTube Downloader API is running",
  "timestamp": "2025-10-30T..."
}
```

### Get Video Info
```
POST /api/info
Content-Type: application/json

{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Response:**
```json
{
  "success": true,
  "id": "VIDEO_ID",
  "title": "Video Title",
  "duration_seconds": 212,
  "duration": "3:32",
  "thumbnail": "https://...",
  "author": "Channel Name",
  "views": "1,234,567",
  "uploadDate": "2025-01-01",
  "description": "Video description...",
  "available_qualities": ["1080p", "720p", "480p", "360p"],
  "available_languages": ["auto", "en"],
  "is_playlist": false,
  "formats": [...]
}
```

### Download Video
```
POST /api/download
Content-Type: application/json

{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "quality": "720p",
  "format": "mp4"
}
```

**Response:** Binary video file stream

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Controlled cross-origin access
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: URL validation
- **Error Handling**: Graceful error responses

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |

## 🚀 Deployment

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set FRONTEND_URL=https://your-frontend-domain.com

# Deploy
git push heroku main
```

### Deploy to Railway

1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Deploy to Render

1. Create new Web Service
2. Connect repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

## ⚠️ Important Notes

1. **Legal Compliance**: Ensure you have rights to download content
2. **YouTube Terms**: Respect YouTube's Terms of Service
3. **Rate Limiting**: API has rate limits to prevent abuse
4. **Educational Use**: This project is for educational purposes

## 🐛 Troubleshooting

### Issue: "Failed to fetch video information"
- **Solution**: Check if the YouTube URL is valid
- **Solution**: Verify internet connection
- **Solution**: Check if video is available in your region

### Issue: CORS errors
- **Solution**: Update `FRONTEND_URL` in `.env`
- **Solution**: Check CORS configuration in `server.js`

### Issue: Download fails midway
- **Solution**: Check internet connection
- **Solution**: Try a different quality/format
- **Solution**: Restart the server

## 📊 Performance

- **Download Speed**: Depends on your internet connection
- **Concurrent Downloads**: Limited by rate limiter
- **Memory Usage**: Optimized streaming (no buffer in memory)

## 🔄 API Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (invalid URL) |
| 429 | Too Many Requests |
| 500 | Server Error |

## 📄 License

MIT License - Created by Abhinav

---

Made with ❤️ by **Abhinav**
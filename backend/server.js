import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import ytdl from 'ytdl-core';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// Helper function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Helper function to format duration
function formatDuration(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// API Routes

// Health check
// Root endpoint for deployment platforms
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'YouTube Downloader API is running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      info: '/api/info',
      download: '/api/download'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get video info
app.post('/api/info', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ 
        error: 'URL is required',
        success: false 
      });
    }

    // Validate YouTube URL
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ 
        error: 'Invalid YouTube URL',
        success: false 
      });
    }

    // Get video info
    const info = await ytdl.getInfo(url);
    const videoDetails = info.videoDetails;

    // Get available formats
    const formats = info.formats
      .filter(format => format.hasVideo || format.hasAudio)
      .map(format => ({
        itag: format.itag,
        quality: format.qualityLabel || format.audioQuality || 'unknown',
        container: format.container,
        hasVideo: format.hasVideo,
        hasAudio: format.hasAudio,
        codec: format.codecs,
        bitrate: format.bitrate,
        size: formatBytes(format.contentLength || 0),
        mimeType: format.mimeType
      }));

    // Get unique quality options
    const qualities = [...new Set(
      formats
        .filter(f => f.hasVideo && f.quality !== 'unknown')
        .map(f => f.quality)
    )].sort((a, b) => {
      const aNum = parseInt(a);
      const bNum = parseInt(b);
      return bNum - aNum;
    });

    // Prepare response
    const response = {
      success: true,
      id: videoDetails.videoId,
      title: videoDetails.title,
      duration_seconds: parseInt(videoDetails.lengthSeconds),
      duration: formatDuration(parseInt(videoDetails.lengthSeconds)),
      thumbnail: videoDetails.thumbnails[videoDetails.thumbnails.length - 1].url,
      author: videoDetails.author.name,
      views: parseInt(videoDetails.viewCount).toLocaleString(),
      uploadDate: videoDetails.uploadDate,
      description: videoDetails.description,
      available_qualities: qualities,
      available_languages: ['auto', 'en'], // ytdl-core doesn't provide language info easily
      is_playlist: false,
      formats: formats
    };

    res.json(response);

  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ 
      error: 'Failed to fetch video information. Please check the URL and try again.',
      success: false,
      details: error.message 
    });
  }
});

// Download video
app.post('/api/download', async (req, res) => {
  try {
    const { url, quality, format } = req.body;

    if (!url) {
      return res.status(400).json({ 
        error: 'URL is required',
        success: false 
      });
    }

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ 
        error: 'Invalid YouTube URL',
        success: false 
      });
    }

    const info = await ytdl.getInfo(url);
    const videoDetails = info.videoDetails;

    // Set response headers for download
    const filename = `${videoDetails.title.replace(/[^a-z0-9]/gi, '_')}.${format || 'mp4'}`;
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'video/mp4');

    // Select format based on quality
    let selectedFormat;
    
    if (quality === 'audio') {
      // Audio only
      selectedFormat = ytdl.chooseFormat(info.formats, { 
        quality: 'highestaudio',
        filter: 'audioonly'
      });
    } else if (quality) {
      // Specific video quality
      selectedFormat = ytdl.chooseFormat(info.formats, { 
        quality: quality,
        filter: 'videoandaudio'
      });
    } else {
      // Default highest quality
      selectedFormat = ytdl.chooseFormat(info.formats, { 
        quality: 'highest',
        filter: 'videoandaudio'
      });
    }

    // Stream video to response
    const videoStream = ytdl.downloadFromInfo(info, { format: selectedFormat });
    
    let downloadedBytes = 0;
    const totalBytes = selectedFormat.contentLength || 0;

    videoStream.on('data', (chunk) => {
      downloadedBytes += chunk.length;
      const progress = totalBytes ? Math.round((downloadedBytes / totalBytes) * 100) : 0;
      console.log(`Download progress: ${progress}%`);
    });

    videoStream.on('error', (error) => {
      console.error('Stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({ 
          error: 'Download failed',
          success: false 
        });
      }
    });

    videoStream.pipe(res);

  } catch (error) {
    console.error('Error downloading video:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to download video. Please try again.',
        success: false,
        details: error.message 
      });
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    success: false 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════════╗
  ║   YouTube Downloader API by Abhinav       ║
  ║   Server running on port ${PORT}             ║
  ║   http://localhost:${PORT}                   ║
  ╚════════════════════════════════════════════╝
  `);
});

export default app;
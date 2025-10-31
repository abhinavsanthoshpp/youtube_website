import { useState } from 'react'

// Replace with your actual Render backend URL
const API_URL = (import.meta.env.VITE_API_URL as string) || 'https://youtube-downloader-api-898z.onrender.com'

interface VideoInfo {
  id: string
  title: string
  duration_seconds: number
  duration: string
  thumbnail: string
  author: string
  views: string
  uploadDate: string
  description: string
  available_qualities: string[]
  available_languages: string[]
  is_playlist: boolean
  formats: any[]
}

interface DownloadOptions {
  quality?: string
  format?: string
}

export function useYoutubeApi() {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [downloadProgress, setDownloadProgress] = useState(0)

  const fetchVideoInfo = async (url: string) => {
    setIsLoading(true)
    setError(null)
    setVideoInfo(null)

    try {
      const response = await fetch(`${API_URL}/api/info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch video info')
      }

      if (data.success) {
        setVideoInfo(data)
      } else {
        throw new Error(data.error || 'Failed to fetch video info')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching video info')
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadVideo = async (url: string, options: DownloadOptions = {}) => {
    setDownloadProgress(0)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url, 
          quality: options.quality,
          format: options.format || 'mp4'
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to download video')
      }

      // Get filename from headers
      const contentDisposition = response.headers.get('Content-Disposition')
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
      const filename = filenameMatch ? filenameMatch[1] : 'video.mp4'

      // Read the stream and track progress
      const reader = response.body?.getReader()
      const contentLength = parseInt(response.headers.get('Content-Length') || '0')
      
      let receivedLength = 0
      const chunks: BlobPart[] = []

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          
          if (done) break
          
          chunks.push(value as BlobPart)
          receivedLength += value.length
          
          if (contentLength > 0) {
            const progress = Math.round((receivedLength / contentLength) * 100)
            setDownloadProgress(progress)
          }
        }
      }

      // Create blob and download
      const blob = new Blob(chunks)
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)

      setDownloadProgress(100)
      
      // Reset progress after 3 seconds
      setTimeout(() => {
        setDownloadProgress(0)
      }, 3000)

    } catch (err: any) {
      setError(err.message || 'An error occurred while downloading')
      setDownloadProgress(0)
      console.error('Error:', err)
    }
  }

  return {
    videoInfo,
    isLoading,
    error,
    downloadProgress,
    fetchVideoInfo,
    downloadVideo,
  }
}
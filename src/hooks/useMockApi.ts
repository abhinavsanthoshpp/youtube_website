import { useState, useEffect } from 'react'

interface VideoInfo {
  id: string
  title: string
  duration_seconds: number
  thumbnail: string
  available_qualities: string[]
  available_languages: string[]
  is_playlist: boolean
}

export function useMockApi() {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [downloadProgress, setDownloadProgress] = useState(0)

  const mockVideoInfo: VideoInfo = {
    id: 'dQw4w9WgXcQ',
    title: 'Sample YouTube Video',
    duration_seconds: 212,
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    available_qualities: ['144p', '360p', '720p', '1080p', '4K'],
    available_languages: ['auto', 'en', 'es', 'fr', 'de'],
    is_playlist: false,
  }

  const fetchVideoInfo = () => {
    setIsLoading(true)
    setError(null)

    // Simulate API call
    setTimeout(() => {
      setVideoInfo(mockVideoInfo)
      setIsLoading(false)
    }, 1500)
  }

  const startDownload = () => {
    setDownloadProgress(0)
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev: number) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)

    return () => clearInterval(interval)
  }

  useEffect(() => {
    fetchVideoInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    videoInfo,
    isLoading,
    error,
    downloadProgress,
    startDownload,
  }
}
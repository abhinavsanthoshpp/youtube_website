import { motion, AnimatePresence } from 'framer-motion'
import { LinkInput } from './LinkInput'
import { VideoPreview } from './VideoPreview'
import { QualitySelector } from './QualitySelector'
import { LanguageSelector } from './LanguageSelector'
import { DownloadCard } from './DownloadCard'
import { FooterDisclaimer } from './FooterDisclaimer'
import { ParticleBackground } from './ParticleBackground'
import { StatsCounter } from './StatsCounter'
import { useYoutubeApi } from '../hooks/useYoutubeApi'
import { Youtube, Sparkles } from 'lucide-react'
import { useState } from 'react'

export function YoutubeDownloader() {
  const { videoInfo, isLoading, error, downloadProgress, fetchVideoInfo, downloadVideo } = useYoutubeApi()
  const [currentUrl, setCurrentUrl] = useState('')
  const [selectedQuality, setSelectedQuality] = useState<string>('')

  const handleUrlSubmit = (value: string) => {
    setCurrentUrl(value)
    fetchVideoInfo(value)
  }

  const handleDownload = () => {
    if (currentUrl) {
      downloadVideo(currentUrl, { quality: selectedQuality || 'highest' })
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-youtube-dark/20" />
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-youtube-red/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header with Premium Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Youtube className="w-12 h-12 text-youtube-red" />
            </motion.div>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
          
          <motion.h1
            className="text-6xl md:text-7xl font-black mb-6 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-youtube-red via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              YouTube Downloader
            </span>
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-youtube-red/20 to-pink-500/20 blur-2xl -z-10"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
          </motion.h1>
          
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Download your favorite videos in stunning quality with blazing fast speed
          </motion.p>
        </motion.div>

        {/* Stats Counter */}
        <div className="max-w-3xl mx-auto mb-8">
          <StatsCounter />
        </div>

        {/* Main Content with Stagger Animation */}
        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <LinkInput onSubmit={handleUrlSubmit} />

          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                  <div className="h-64 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="h-12 bg-muted rounded-xl w-2/3 animate-pulse" />
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="p-6 bg-destructive/10 text-destructive rounded-2xl border border-destructive/20 backdrop-blur-sm"
              >
                {error}
              </motion.div>
            )}

            {videoInfo && !isLoading && (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <VideoPreview
                  title={videoInfo.title}
                  thumbnail={videoInfo.thumbnail}
                  duration={videoInfo.duration_seconds}
                />
                
                <motion.div
                  className="grid md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <QualitySelector 
                    qualities={videoInfo.available_qualities} 
                    onQualityChange={setSelectedQuality}
                  />
                  <LanguageSelector languages={videoInfo.available_languages} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <DownloadCard
                    onDownload={handleDownload}
                    progress={downloadProgress}
                    isPlaylist={videoInfo.is_playlist}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <FooterDisclaimer />
      </div>
    </div>
  )
}
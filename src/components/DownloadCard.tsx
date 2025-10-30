import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Switch } from './ui/switch'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { Download, Music, Video, Settings, CheckCircle2, Loader2 } from 'lucide-react'

interface DownloadCardProps {
  onDownload: () => void
  progress: number
  isPlaylist: boolean
}

export function DownloadCard({
  onDownload,
  progress,
  isPlaylist,
}: DownloadCardProps) {
  const [isAudioOnly, setIsAudioOnly] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)
    onDownload()
    setTimeout(() => setIsDownloading(false), 5000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="relative group"
    >
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-youtube-red via-purple-500 to-pink-500 rounded-3xl blur-xl"
        animate={{
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <div className="relative p-8 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl"
    >
        <div className="space-y-8">
          {/* Audio/Video Toggle */}
          <motion.div
            className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: isAudioOnly ? 0 : 360 }}
                transition={{ duration: 0.5 }}
              >
                {isAudioOnly ? (
                  <Music className="w-5 h-5 text-youtube-red" />
                ) : (
                  <Video className="w-5 h-5 text-youtube-red" />
                )}
              </motion.div>
              <div>
                <p className="font-semibold">{isAudioOnly ? 'Audio Only' : 'Video + Audio'}</p>
                <p className="text-xs text-muted-foreground">
                  {isAudioOnly ? 'Extract audio track only' : 'Download full video'}
                </p>
              </div>
            </div>
            <Switch
              checked={isAudioOnly}
              onCheckedChange={setIsAudioOnly}
            />
          </motion.div>

          {/* Advanced Settings */}
          <Accordion type="single" collapsible>
            <AccordionItem value="advanced" className="border-0">
              <AccordionTrigger className="hover:no-underline p-4 rounded-xl bg-background/50 border border-border/50 hover:bg-background/70 transition-colors">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-youtube-red" />
                  <span className="font-semibold">Advanced Settings</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 pt-6"
                >
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      Output Filename Pattern
                    </label>
                    <input
                      type="text"
                      placeholder="%(title)s.%(ext)s"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-youtube-red focus:ring-2 focus:ring-youtube-red/20 transition-all outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Audio Format</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-youtube-red focus:ring-2 focus:ring-youtube-red/20 transition-all outline-none">
                        <option value="mp3">MP3</option>
                        <option value="m4a">M4A</option>
                        <option value="opus">Opus</option>
                        <option value="wav">WAV</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Video Codec</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-youtube-red focus:ring-2 focus:ring-youtube-red/20 transition-all outline-none">
                        <option value="h264">H.264</option>
                        <option value="vp9">VP9</option>
                        <option value="av1">AV1</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Progress Bar */}
          <AnimatePresence>
            {progress > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <div className="relative">
                  <Progress value={progress} className="h-3" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Downloading...</span>
                  <span className="font-semibold text-youtube-red">{progress}%</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Download Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="relative w-full h-14 text-lg font-bold bg-gradient-to-r from-youtube-red to-red-600 hover:from-youtube-red/90 hover:to-red-600/90 text-white shadow-lg shadow-youtube-red/50 overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative flex items-center justify-center gap-3">
                {isDownloading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Downloading...
                  </>
                ) : progress === 100 ? (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    Downloaded!
                  </>
                ) : (
                  <>
                    <Download className="w-6 h-6" />
                    Download {isPlaylist ? 'Playlist' : 'Video'}
                  </>
                )}
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
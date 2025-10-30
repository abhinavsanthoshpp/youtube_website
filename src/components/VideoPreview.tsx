import { motion } from 'framer-motion'
import { formatDuration } from '../utils/format'
import { Play, Clock, Eye } from 'lucide-react'
import { useState } from 'react'

interface VideoPreviewProps {
  title: string
  thumbnail: string
  duration: number
}

export function VideoPreview({ title, thumbnail, duration }: VideoPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-youtube-red via-pink-500 to-purple-500 rounded-3xl blur-xl"
        animate={{
          opacity: isHovered ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative rounded-2xl overflow-hidden bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl">
        <div className="relative aspect-video overflow-hidden">
          <motion.img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Overlay gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            animate={{
              opacity: isHovered ? 1 : 0.7,
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Play button overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-youtube-red/90 backdrop-blur-sm flex items-center justify-center shadow-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </motion.div>
          </motion.div>
          
          {/* Duration badge */}
          <motion.div
            className="absolute bottom-3 right-3 bg-black/90 backdrop-blur-sm text-white px-3 py-1.5 text-sm font-semibold rounded-lg flex items-center gap-1.5"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Clock className="w-3.5 h-3.5" />
            {formatDuration(duration)}
          </motion.div>
          
          {/* View badge */}
          <motion.div
            className="absolute top-3 left-3 bg-black/90 backdrop-blur-sm text-white px-3 py-1.5 text-sm font-semibold rounded-lg flex items-center gap-1.5"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Eye className="w-3.5 h-3.5" />
            HD Ready
          </motion.div>
        </div>
        
        <motion.div
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold line-clamp-2 mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            {title}
          </h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <motion.span
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Ready to download
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
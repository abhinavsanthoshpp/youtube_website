import { motion } from 'framer-motion'
import { Youtube, Loader2 } from 'lucide-react'

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="relative">
        {/* Animated circles */}
        <motion.div
          className="absolute inset-0 -m-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-40 h-40 border-4 border-youtube-red/20 border-t-youtube-red rounded-full" />
        </motion.div>
        
        <motion.div
          className="absolute inset-0 -m-16"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-32 h-32 border-4 border-pink-500/20 border-t-pink-500 rounded-full" />
        </motion.div>

        {/* Center icon */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Youtube className="w-16 h-16 text-youtube-red" />
          </motion.div>
          
          <motion.div
            className="flex items-center gap-2 text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">Loading...</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
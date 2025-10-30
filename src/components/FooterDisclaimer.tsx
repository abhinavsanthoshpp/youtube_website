import { motion } from 'framer-motion'
import { Shield, Heart, Code } from 'lucide-react'

export function FooterDisclaimer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="text-center py-16 mt-20"
    >
      <motion.div
        className="flex items-center justify-center gap-2 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Shield className="w-5 h-5 text-youtube-red" />
        <span className="text-sm font-semibold text-muted-foreground">
          Educational Use Only
        </span>
      </motion.div>
      
      <motion.p
        className="text-sm text-muted-foreground mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        This tool is designed for educational purposes and demonstration only.
      </motion.p>
      
      <motion.p
        className="text-sm text-muted-foreground mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        All content remains the property of their respective owners.
      </motion.p>

      <motion.div
        className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span>Made by</span>
        <motion.span
          className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-youtube-red via-pink-500 to-purple-500 text-sm"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Abhinav
        </motion.span>
        <span>with</span>
        <Heart className="w-4 h-4 text-youtube-red fill-youtube-red animate-pulse" />
        <span>and</span>
        <Code className="w-4 h-4 text-youtube-red" />
      </motion.div>
    </motion.footer>
  )
}
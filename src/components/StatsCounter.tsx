import { motion } from 'framer-motion'
import { TrendingUp, Users, Video } from 'lucide-react'

interface StatItemProps {
  icon: React.ReactNode
  value: string
  label: string
  delay: number
}

function StatItem({ icon, value, label, delay }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="text-youtube-red"
      >
        {icon}
      </motion.div>
      <motion.div
        className="text-2xl font-bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: 'spring' }}
      >
        {value}
      </motion.div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </motion.div>
  )
}

export function StatsCounter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="grid grid-cols-3 gap-4 mb-12"
    >
      <StatItem
        icon={<Video className="w-6 h-6" />}
        value="10K+"
        label="Videos Downloaded"
        delay={0.9}
      />
      <StatItem
        icon={<Users className="w-6 h-6" />}
        value="5K+"
        label="Happy Users"
        delay={1.0}
      />
      <StatItem
        icon={<TrendingUp className="w-6 h-6" />}
        value="99.9%"
        label="Success Rate"
        delay={1.1}
      />
    </motion.div>
  )
}
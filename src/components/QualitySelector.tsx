import { motion } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Label } from './ui/label'
import { MonitorPlay, Sparkles } from 'lucide-react'

interface QualitySelectorProps {
  qualities: string[]
  onQualityChange?: (quality: string) => void
}

export function QualitySelector({ qualities, onQualityChange }: QualitySelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3"
    >
      <Label className="flex items-center gap-2 text-base font-semibold">
        <MonitorPlay className="w-5 h-5 text-youtube-red" />
        Video Quality
      </Label>
      <div className="relative">
        <Select 
          defaultValue={qualities[0]} 
          onValueChange={onQualityChange}
        >
          <SelectTrigger className="h-12 bg-background/50 border-border/50 hover:bg-background/70 transition-colors">
            <SelectValue placeholder="Select quality" />
          </SelectTrigger>
          <SelectContent>
            {qualities.map((quality) => (
              <SelectItem
                key={quality}
                value={quality}
                className="cursor-pointer hover:bg-youtube-red/10"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-youtube-red" />
                  {quality}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  )
}
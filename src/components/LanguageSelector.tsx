import { motion } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Label } from './ui/label'
import { Languages, Globe } from 'lucide-react'

interface LanguageSelectorProps {
  languages: string[]
}

export function LanguageSelector({ languages }: LanguageSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3"
    >
      <Label className="flex items-center gap-2 text-base font-semibold">
        <Languages className="w-5 h-5 text-youtube-red" />
        Language
      </Label>
      <div className="relative">
        <Select defaultValue={languages[0]}>
          <SelectTrigger className="h-12 bg-background/50 border-border/50 hover:bg-background/70 transition-colors">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem
                key={language}
                value={language}
                className="cursor-pointer hover:bg-youtube-red/10"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-youtube-red" />
                  {language.toUpperCase()}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  )
}
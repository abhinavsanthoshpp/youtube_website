import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search, Link2, Sparkles } from 'lucide-react'

interface LinkInputProps {
  onSubmit: (url: string) => void
}

export function LinkInput({ onSubmit }: LinkInputProps) {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSubmit(value.trim())
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
      onSubmit={handleSubmit}
      className="relative"
    >
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-youtube-red via-pink-500 to-purple-500 rounded-2xl blur-xl opacity-20"
        animate={{
          opacity: isFocused ? 0.4 : 0.2,
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative flex gap-3 p-2 bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl">
        <motion.div
          className="absolute left-5 top-1/2 -translate-y-1/2"
          animate={{ rotate: isFocused ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link2 className="w-5 h-5 text-muted-foreground" />
        </motion.div>
        
        <Input
          type="url"
          placeholder="Paste your YouTube URL here..."
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 h-14 pl-12 pr-4 border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0"
          required
        />
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="submit"
            size="lg"
            className="relative h-14 px-8 bg-gradient-to-r from-youtube-red to-red-600 hover:from-youtube-red/90 hover:to-red-600/90 text-white font-semibold shadow-lg overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative flex items-center gap-2">
              <Search className="w-5 h-5" />
              Analyze
              <Sparkles className="w-4 h-4" />
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.form>
  )
}
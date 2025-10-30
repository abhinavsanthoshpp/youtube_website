import { ThemeProvider } from './components/ThemeProvider'
import { Toaster } from './components/ui/toaster'
import { YoutubeDownloader } from './components/YoutubeDownloader'
import { ThemeToggle } from './components/ThemeToggle'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="youtube-downloader-theme">
      <main className="min-h-screen bg-background">
        <ThemeToggle />
        <YoutubeDownloader />
        <Toaster />
      </main>
    </ThemeProvider>
  )
}

export default App
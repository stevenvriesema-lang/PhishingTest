import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'
import LandingPage from './components/LandingPage'
import RickCard from './components/RickCard'
import TipsGrid from './components/TipsGrid'
import FooterNote from './components/FooterNote'

interface HitPayload {
  ts: string
  route: string
  sid: string
}

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const sessionIdRef = useRef<string | null>(null)
  const hasTrackedRef = useRef(false)

  // Initialize session ID only once
  if (!sessionIdRef.current) {
    sessionIdRef.current = uuidv4()
  }

  const handleContinue = () => {
    // Track hit when user clicks "Ga verder" - not on mount
    if (!hasTrackedRef.current && sessionIdRef.current) {
      const payload: HitPayload = {
        ts: new Date().toISOString(),
        route: '/',
        sid: sessionIdRef.current,
      }

      fetch('/api/hit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (res.ok) hasTrackedRef.current = true
        })
        .catch((err) => console.error('Tracking error:', err))
    }
    
    setHasStarted(true)
  }

  // Show landing page first
  if (!hasStarted) {
    return <LandingPage onContinue={handleContinue} />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with centered logo */}
      <header className="bg-[#09529a] py-2">
        <div className="flex justify-center">
          <div className="w-1/3"></div>
          <div className="w-1/3 bg-white rounded-lg p-2 flex justify-center max-w-xs">
            <img 
              src="https://terwille.nl/wp-content/uploads/elementor/thumbs/Logo-Terwille-quv3ffjb1m15we0fi4hoyd4okjrgf9ca20xl99s2hs.jpg" 
              alt="Terwille" 
              className="h-12 w-auto"
            />
          </div>
          <div className="w-1/3"></div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium bg-[#bfcae2] text-[#09529a] rounded-full">
            Interne oefening
          </span>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-4xl mx-auto mb-12"
        >
          <RickCard />
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <TipsGrid />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-[#bfcae2] py-6">
        <div className="container mx-auto px-4">
          <FooterNote />
        </div>
      </footer>
    </div>
  )
}

export default App

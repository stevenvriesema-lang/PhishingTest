import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LandingPageProps {
  onContinue: () => void
}

function LandingPage({ onContinue }: LandingPageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Simulate loading progress over 5 seconds
  useEffect(() => {
    const duration = 5000 // 5 seconds
    const interval = 50 // update every 50ms
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = (currentStep / steps) * 100
      setLoadingProgress(progress)

      if (currentStep >= steps) {
        clearInterval(timer)
        setIsLoading(false)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      {/* Logo with white background */}
      <div className="mb-12 bg-white rounded-lg p-4">
        <img 
          src="https://terwille.nl/wp-content/uploads/elementor/thumbs/Logo-Terwille-quv3ffjb1m15we0fi4hoyd4okjrgf9ca20xl99s2hs.jpg" 
          alt="Terwille" 
          className="h-24 w-auto"
        />
      </div>

      {/* Loading animation */}
      {isLoading ? (
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#09529a] rounded-full animate-spin" />
          
          {/* Progress bar */}
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#09529a]"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          
          <p className="text-gray-500 text-sm">Laden...</p>
        </div>
      ) : (
        /* Continue button - appears after loading */
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onContinue}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 bg-[#09529a] hover:bg-[#074078] text-white text-xl font-bold rounded-lg shadow-lg transition-colors"
        >
          Ga verder →
        </motion.button>
      )}
    </div>
  )
}

export default LandingPage

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function RickCard() {
  const [showInfo, setShowInfo] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [totalHits, setTotalHits] = useState<number | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Fetch total hits on mount
  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setTotalHits(data.totalHits || 0)
      })
      .catch(() => {
        setTotalHits(0)
      })
  }, [])

  // Unmute and play on mount
  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      const timer = setTimeout(() => {
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'unMute' }),
            '*'
          )
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'setVolume', args: [30] }),
            '*'
          )
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'playVideo' }),
            '*'
          )
          setIsMuted(false)
        }
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  // Show educational info after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfo(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  // Auto-scroll effect
  useEffect(() => {
    if (!showInfo || !scrollContainerRef.current) return

    const scrollContainer = scrollContainerRef.current
    const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight
    let animationFrame: number

    const animateScroll = () => {
      setScrollProgress(prev => {
        const newProgress = prev + 0.03
        
        if (newProgress >= 100) {
          scrollContainer.scrollTop = 0
          return 0
        }
        
        scrollContainer.scrollTop = (newProgress / 100) * scrollHeight
        return newProgress
      })
      
      animationFrame = requestAnimationFrame(animateScroll)
    }

    animationFrame = requestAnimationFrame(animateScroll)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [showInfo])

  const toggleMute = () => {
    if (iframeRef.current?.contentWindow) {
      if (isMuted) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'setVolume', args: [30] }),
          '*'
        )
      } else {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'mute' }),
          '*'
        )
      }
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="relative">
      {/* Video container with rounded corners */}
      <div className="relative rounded-lg overflow-hidden shadow-2xl w-full">
        <iframe
          ref={iframeRef}
          className="w-full h-[300px] md:h-[500px] md:w-auto md:aspect-video"
          src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&volume=30"
          title="Never Gonna Give You Up"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

        {/* Volume control button */}
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-10"
          aria-label={isMuted ? "Geluid aan" : "Geluid uit"}
        >
          {isMuted ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>

        {/* Educational overlay - appears after 5 seconds */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 md:inset-2 bg-[#09529a]/95 flex items-center justify-center p-4 md:p-8 z-40 rounded-lg"
            >
              <div className="max-w-2xl text-white w-full flex flex-col h-full">
                {/* Header with counter */}
                <div className="flex items-center justify-between mb-3 flex-shrink-0">
                  <div className="bg-white rounded-lg p-2">
                    <img 
                      src="https://terwille.nl/wp-content/uploads/elementor/thumbs/Logo-Terwille-quv3ffjb1m15we0fi4hoyd4okjrgf9ca20xl99s2hs.jpg" 
                      alt="Terwille" 
                      className="h-8 w-auto"
                    />
                  </div>
                  
                  {totalHits !== null && (
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                      </svg>
                      <span className="text-sm font-medium">{totalHits} deelnemers</span>
                    </div>
                  )}
                </div>
                
                {/* Scrollable content */}
                <div 
                  ref={scrollContainerRef}
                  className="flex-1 overflow-y-auto scrollbar-hide"
                >
                  <h2 className="text-xl font-bold text-center mb-4">
                    🛡️ Phishing: Herken de risico's
                  </h2>

                  <div className="space-y-4 text-sm">
                    <div className="bg-white/10 rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">⚠️ Wat is phishing?</h3>
                      <p>Phishing is een vorm van cybercrime waarbij oplichters je proberen te misleiden om gevoelige informatie te delen, zoals wachtwoorden of bankgegevens.</p>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">🔍 Hoe herken je phishing?</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Onbekende afzender of vreemd e-mailadres</li>
                        <li>Dringende taal ("Nu handelen!", "Account geblokkeerd")</li>
                        <li>Vreemde links of bijlagen</li>
                        <li>Spelfouten en grammaticale fouten</li>
                        <li>Verzoeken om persoonlijke gegevens</li>
                        <li>Vreemde URL's die lijken op echte websites</li>
                      </ul>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">⚠️ Risico's</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Gestolen inloggegevens</li>
                        <li>Malware en ransomware</li>
                        <li>Identiteitsdiefstal</li>
                        <li>Financiële schade</li>
                        <li>Datalekken binnen de organisatie</li>
                      </ul>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">✅ Wat te doen?</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Klik niet op verdachte links</li>
                        <li>Open geen onbekende bijlagen</li>
                        <li>Controleer altijd het e-mailadres van de afzender</li>
                        <li>Twijfel? Neem contact op met IT</li>
                        <li>Meld verdachte e-mails via VIM</li>
                        <li>Gebruik tweefactorauthenticatie</li>
                      </ul>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">📧 Voorbeelden van phishing</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>"Uw account wordt geblokkeerd"</li>
                        <li>"Klik hier om uw pakket te traceren"</li>
                        <li>"U heeft een betaling ontvangen"</li>
                        <li>"Uw wachtwoord is verlopen"</li>
                        <li>"U komt in aanmerking voor een terugbetaling"</li>
                      </ul>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">🛡️ Bescherm uzelf</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Wees altijd alert op verdachte berichten</li>
                        <li>Meldingen helpen om dreigingen te identificeren</li>
                        <li>Regelmatig wachtwoorden wijzigen</li>
                        <li>Software en systemen up-to-date houden</li>
                        <li>Bij twijfel: niet klikken, maar verifiëren</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-2 flex-shrink-0">
                  <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-100"
                      style={{ width: `${scrollProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-center mt-1 text-white/70">
                    Automatisch scrollen...
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Counter below video - only visible when overlay is NOT active */}
      {!showInfo && (
        <div className="mt-3 text-center">
          {totalHits !== null ? (
            <p className="text-xs text-[#09529a]/70 font-medium">
              📊 {totalHits} deelnemers
            </p>
          ) : (
            <p className="text-xs text-gray-400">Laden...</p>
          )}
        </div>
      )}
    </div>
  )
}

export default RickCard

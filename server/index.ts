import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import path from 'path'
import { fileURLToPath } from 'url'
import { recordHit, getStats, healthCheck, checkRateLimit, resetStats } from './store.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3001

// Trust proxy for rate limiting (when behind reverse proxy)
app.set('trust proxy', 1)

// Security headers via Helmet
// Note: We configure frameguard to 'none' since we embed YouTube
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      frameSrc: ["'self'", "https://www.youtube-nocookie.com"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  frameguard: {
    action: 'deny',
  },
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin',
  },
}))

// Compression
app.use(compression())

// Parse JSON bodies
app.use(express.json())

// Serve static files from dist in production
const isProduction = process.env.NODE_ENV === 'production'
if (isProduction) {
  app.use(express.static(path.join(__dirname, '..', 'dist')))
}

// Rate limiting middleware
function rateLimitMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown'
  
  if (!checkRateLimit(ip)) {
    res.status(429).json({ error: 'Te veel verzoeken. Probeer later opnieuw.' })
    return
  }
  
  next()
}

// POST /api/hit - Record a hit (no PII stored)
app.post('/api/hit', rateLimitMiddleware, (req, res) => {
  const { ts, route, sid } = req.body
  
  // Validate required fields
  if (!ts || !route || !sid) {
    res.status(400).json({ error: 'Ontbrekende velden' })
    return
  }
  
  // We only store: timestamp (for date extraction), route, and session ID is not persisted
  // No PII: no IP, no User-Agent, no email, no fingerprint
  const result = recordHit()
  
  res.json({ success: result.success, totalHits: result.totalHits })
})

// GET /api/stats - Get aggregated statistics
app.get('/api/stats', (req, res) => {
  const stats = getStats()
  res.json(stats)
})

// GET /api/reset - Reset all statistics (for admin purposes)
app.get('/api/reset', (req, res) => {
  try {
    resetStats()
    res.json({ success: true, message: 'Statistieken zijn gereset' })
  } catch (error) {
    res.status(500).json({ error: 'Kon statistieken niet resetten' })
  }
})

// GET /api/health - Health check endpoint
app.get('/api/health', (req, res) => {
  const health = healthCheck()
  res.json(health)
})

// Serve React app for all other routes (SPA support)
if (isProduction) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
  })
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${isProduction ? 'production' : 'development'}`)
})

export default app

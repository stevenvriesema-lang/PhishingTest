import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '..', 'data')
const dbPath = path.join(dataDir, 'metrics.db')

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Initialize SQLite database
const db = new Database(dbPath)

// Create metrics table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    hits INTEGER DEFAULT 0,
    UNIQUE(date)
  )
`)

// Rate limiting: simple in-memory token bucket
interface RateLimitEntry {
  tokens: number
  lastRefill: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()
const RATE_LIMIT_MAX = 10 // max requests per window
const RATE_LIMIT_WINDOW = 60000 // 1 minute in ms
const TOKEN_REFILL_RATE = 2 // tokens per second

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry) {
    rateLimitMap.set(ip, { tokens: RATE_LIMIT_MAX - 1, lastRefill: now })
    return true
  }

  const timePassed = now - entry.lastRefill
  const tokensToAdd = Math.floor(timePassed / 1000) * TOKEN_REFILL_RATE
  const newTokens = Math.min(RATE_LIMIT_MAX, entry.tokens + tokensToAdd)

  if (newTokens > 0) {
    rateLimitMap.set(ip, { tokens: newTokens - 1, lastRefill: now })
    return true
  }

  return false
}

// Get today's date string
function getTodayDate(): string {
  return new Date().toISOString().split('T')[0]
}

// Record a hit
export function recordHit(): { success: boolean; totalHits: number } {
  const today = getTodayDate()

  // Try to update existing row
  const updateStmt = db.prepare('UPDATE metrics SET hits = hits + 1 WHERE date = ?')
  const updateResult = updateStmt.run(today)

  // If no row was updated, insert a new one
  if (updateResult.changes === 0) {
    const insertStmt = db.prepare('INSERT INTO metrics (date, hits) VALUES (?, 1)')
    insertStmt.run(today)
  }

  // Get total hits
  const totalResult = db.prepare('SELECT SUM(hits) as total FROM metrics').get() as { total: number }
  const totalHits = totalResult?.total || 0

  return { success: true, totalHits }
}

// Get aggregated stats
export function getStats(): { totalHits: number; byDate: Record<string, number> } {
  const rows = db.prepare('SELECT date, hits FROM metrics ORDER BY date DESC').all() as { date: string; hits: number }[]
  
  const byDate: Record<string, number> = {}
  let totalHits = 0

  for (const row of rows) {
    byDate[row.date] = row.hits
    totalHits += row.hits
  }

  return { totalHits, byDate }
}

// Reset all statistics
export function resetStats(): void {
  db.prepare('DELETE FROM metrics').run()
}

// Health check
export function healthCheck(): { status: string; timestamp: string } {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
  }
}

export { checkRateLimit }

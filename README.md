# Phishing Awareness Landing Page - Terwille

Een interne phishing-awareness oefening met een Rickroll. Gebouwd met React 18, Vite, TypeScript, Tailwind CSS en Framer Motion.

## 🚀 Quick Start

```bash
# Installeer dependencies
npm install

# Start ontwikkelmodus (twee terminals nodig)
npm run dev:client  # Terminal 1: Vite dev server
npm run dev:server  # Terminal 2: Express API

# Of start alles tegelijk
npm run dev
```

## 📁 Projectstructuur

```
/app
├─ src/
│  ├─ components/
│  │  ├─ RickCard.tsx     # Rickroll video embed
│  │  ├─ TipsGrid.tsx    # Phishing tips & info
│  │  └─ FooterNote.tsx  # Privacy verklaring
│  ├─ styles/theme.ts    # Kleurentokens
│  ├─ App.tsx            # Hoofdcomponent
│  └─ main.tsx           # Entry point
├─ server/
│  ├─ index.ts           # Express server
│  └─ store.ts           # SQLite metrics store
├─ data/
│  └─ metrics.db         # SQLite database
├─ package.json
└─ README.md
```

## 🔒 Privacy & Beveiliging

### Geen PII opslag
- ❌ Geen IP-adressen
- ❌ Geen e-mailadressen
- ❌ Geen User-Agent strings
- ❌ Geen fingerprinting
- ❌ Geen cookies met tracking-ID's

### Welke data wordt opgeslagen
- ✅ Timestamp (alleen datum voor aggregatie)
- ✅ Route (/pageview)
- ✅ Session-ID (UUIDv4, alleen in memory, niet gepersisteerd)
- ✅ Totaal aantal hits (aggregaat)
- ✅ Hits per dag (aggregaat)

### Beveiligingsmaatregelen
- CSP headers (Content-Security-Policy)
- frame-ancestors: 'none' (tegen clickjacking)
- Referrer-Policy: strict-origin-when-cross-origin
- Rate limiting (token bucket, 10 req/min)
- Helmet.js voor security headers
- Geen externe analytics (geen GA, Hotjar, etc.)

## 📡 API Endpoints

| Endpoint | Methode | Beschrijving |
|----------|---------|--------------|
| `/api/hit` | POST | Registreer een hit |
| `/api/stats` | GET | Haal aggregaten op |
| `/api/health` | GET | Health check |

## 🎨 Kleurentokens (Terwille)

```css
--primary: #0069B4
--primaryDark: #004B87
--primaryLight: #4CC6E8
--bg: #0B1220
--text: #F6FAFF
--subtle: #E6F4FB
```

## ⚠️ AVG / GDPR

Deze applicatie:
- Verwerkt geen persoonsgegevens
- Slaat geen identificerende informatie op
- Heeft geen cookiewall nodig
- Is volledig anoniem

Zie footer voor de officiële privacyverklaring.

## 📝 Risico's bij klikken

Dit is een oefenomgeving. De "phishing" link is onschadelijk en toont alleen een Rickroll-video. In het echt kan klikken op phishing leiden tot:
- Credential-diefstal
- Malware-infecties
- Datalekken
- Reputatieschade

## 🛠️ Bouwen voor productie

```bash
npm run build
npm run preview
```

## 📦 Dependencies

- React 18
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Express
- better-sqlite3
- Helmet
- UUID

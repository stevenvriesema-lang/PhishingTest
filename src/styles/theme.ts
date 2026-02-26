// Terwille theme tokens for phishing awareness landing page
export const theme = {
  colors: {
    primary: '#0069B4',
    primaryDark: '#004B87',
    primaryLight: '#4CC6E8',
    bg: '#0B1220',
    text: '#F6FAFF',
    subtle: '#E6F4FB',
  },
  radius: {
    md: '12px',
    lg: '20px',
  },
} as const

export type Theme = typeof theme

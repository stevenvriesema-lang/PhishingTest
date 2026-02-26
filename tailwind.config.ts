import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#09529a',
        primaryDark: '#09529a',
        primaryLight: '#bfcae2',
        bg: '#ffffff',
        text: '#09529a',
        subtle: '#bfcae2',
      },
      borderRadius: {
        md: '12px',
        lg: '20px',
      },
    },
  },
  plugins: [],
} satisfies Config

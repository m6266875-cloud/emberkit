/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Kept for backwards compatibility with any lingering references —
        // aliased to the new ember scale so nothing breaks.
        brand: {
          50: '#FFF4EC',
          100: '#FFE4D1',
          200: '#FFC9A3',
          500: '#FF6A2B',
          600: '#F0551A',
          700: '#C43F0F',
        },
        ember: {
          50: '#FFF4EC',
          100: '#FFE4D1',
          200: '#FFC9A3',
          300: '#FFA366',
          400: '#FF8A4C',
          500: '#FF6A2B',
          600: '#F0551A',
          700: '#C43F0F',
          800: '#9C3210',
          900: '#7A2A11',
        },
        ink: {
          DEFAULT: '#0D0D0F',
          soft: '#121214',
          surface: '#161619',
          raised: '#1C1C20',
          border: '#26262B',
          muted: '#8A8A93',
          faint: '#5C5C64',
        },
        paper: {
          DEFAULT: '#FAF9F6',
          surface: '#FFFFFF',
          border: '#E7E4DC',
          muted: '#6B6A64',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        sm: '3px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
      },
    },
  },
  plugins: [],
};

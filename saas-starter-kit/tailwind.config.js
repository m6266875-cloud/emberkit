/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        soft: 'rgb(var(--soft) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        ember: { DEFAULT: '#f06642', light: '#ffede6', dark: '#d94a29' },
      },
      fontFamily: {
        sans: ['DM Sans Variable', 'Arial', 'sans-serif'],
        display: ['DM Sans Variable', 'Arial', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 12px 40px -24px rgba(27, 31, 29, 0.24)',
        float: '0 32px 100px -32px rgba(27, 31, 29, 0.28)',
      },
      borderRadius: { xl: '16px', '2xl': '24px', '3xl': '32px' },
    },
  },
  plugins: [],
};

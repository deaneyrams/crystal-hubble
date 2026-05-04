/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        syntry: {
          obsidian: '#0F172A', // Slate 900/950 Blend
          teal: {
            600: '#0D9488',
            700: '#0F766E',
          },
          slate: {
            200: '#E2E8F0',
            300: '#CBD5E1',
            950: '#0F172A', // As per Directive
          }
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

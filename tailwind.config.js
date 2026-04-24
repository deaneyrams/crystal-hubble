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
          green: '#003300',
          gold: '#D4AF37',
          cream: '#F8F1E3',
          obsidian: '#050508',
          cyan: '#00BFFF',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        heading: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

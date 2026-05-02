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
          obsidian: '#0F172A', // Primary Base
          teal: '#0D9488',     // Action/Growth
          slate: '#E2E8F0',    // Neutral/Border
          amber: '#F59E0B',    // Critical Action
          text: '#1E293B',     // Text (Primary)
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

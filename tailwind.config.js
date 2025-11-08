/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        elisa: {
          blue: '#0066CC',
          cyan: '#00B4D8',
          light: '#E6F3FF',
        },
      },
    },
  },
  plugins: [],
}


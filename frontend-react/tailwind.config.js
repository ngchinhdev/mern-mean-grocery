/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#f0fdf4",
          200: "#dcfccb",
          300: "#bbf7d0",
          400: "#86efac",
          500: "#34d399",
          600: "#10b981",
          700: "#059669",
        },
        't-gray': {
          500: '#6b7280'
        }
      },
    },
  },
  plugins: [],
};
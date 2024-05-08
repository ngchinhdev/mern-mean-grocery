/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
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
      },
    },
  },
  plugins: [],
};
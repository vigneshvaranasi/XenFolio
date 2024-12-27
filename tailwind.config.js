/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navBar: "rgba(101, 122, 132, 0.12)",
      },
      fontFamily: {
        afacad: ['"Afacad"', 'sans-serif'],
      },
      cursor: {
        paint: 'url(./assets/paintCursor.cur),pointer',
      },
    }
  },
  plugins: [],
}
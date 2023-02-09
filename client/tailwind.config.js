/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 9s ease-in-out infinite",
        img: "img 5s ease-in-out infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "66%": {
            transform: "translate(40px, -60px) scale(1.3)",
          },
          "66%": {
            transform: "translate(-30px, 30px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
        img: {
          "0%": {
            transform: "translate(0px, 0px)",
          },
          "66%": {
            transform: "translate(0px, -20px)",
          },
          "100%": {
            transform: "tranlate(0px, 0px)",
          },
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cherry: {
          DEFAULT: "#8B1E3F",
          dark: "#6C1731",
        },
        gold: {
          DEFAULT: "#C08A2E",
          light: "#D9AC5E",
        },
        cream: {
          DEFAULT: "#FBF6EE",
          dark: "#F1E8D8",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

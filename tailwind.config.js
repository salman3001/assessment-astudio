/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        neutra: ["Neutra Text", "sans-serif"],
      },
      colors: {
        primary: "#c0e3e5",
        secondary: "#ebebeb",
        content: "#322625",
        highlighted: "#fdc936",
      },
    },
  },
  plugins: [],
};

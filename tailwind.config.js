/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: "#db0000",
      },

      fontFamily: {
        roboto: ["Roboto", "sans"],
        poppins: ["Poppins", "sans"],
      },

      width: {
        100: "85rem",
        99: "80rem",
        98: "65rem",
      },

      height: {
        105: "55rem",
        100: "38rem",
        99: "33rem",
        98: "30rem",
      },

      backgroundImage: {},
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

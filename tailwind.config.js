/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans"],
      poppins: ["Poppins", "sans"],
    },
    extend: {
      width: {
        100: "85rem",
      },

      height: {
        100: "38rem",
        99: "33rem",
      },

      backgroundImage: {},
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#131326",
      },
      backgroundImage: () => ({
        "gradient-rainbow":
          "linear-gradient(190deg, #ff00cc 23%, #3333ff 70%);",
        "gradient-rainbow-hover":
          "linear-gradient(, #ff00cc 23%, #3333ff 70%);",
      }),
    },
    fontFamily: {
      array: ["Array", "sans-serif"],
      comico: ["Comico", "sans-serif"],
    },
  },
  plugins: [],
};

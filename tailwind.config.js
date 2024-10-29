/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "pokemon-rock": "rgb(148, 81, 81)",
        "pokemon-ghost": "rgb(247, 247, 247)",
        "pokemon-electric": "rgb(255, 255, 161)",
        "pokemon-bug": "#F6D6A7",
        "pokemon-poison": "#e0a7f6",
        "pokemon-normal": "#F4F4F4",
        "pokemon-fairy": "rgba(255, 192, 203, 0.863)",
        "pokemon-fire": "#FBE3DF",
        "pokemon-grass": "#E2F9E1",
        "pokemon-water": "#E0F1FD",
        "pokemon-dark": "#9E9169",
        "pokemon-psychic": "#FC5FD0",
        "pokemon-ground": "#BC7B3D",
        "pokemon-steel": "#6C676E",
        "pokemon-fighting": "#DE911F",
        "pokemon-ice": "#92C3F4",
        "pokemon-dragon": "#E08B2B",
        whiteTransparent: "rgba(255, 255, 255, 0.3)",
      },
    },
  },
  plugins: [],
};

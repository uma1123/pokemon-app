/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rock: "rgb(148, 81, 81)",
        ghost: "rgb(247, 247, 247)",
        electric: "rgb(255, 255, 161)",
        bug: "#F6D6A7",
        poison: "#e0a7f6",
        normal: "#F4F4F4",
        fairy: "rgba(255, 192, 203, 0.863)",
        fire: "#FBE3DF",
        grass: "#E2F9E1",
        water: "#E0F1FD",
        dark: "#9E9169",
        psychic: "#FC5FD0",
        ground: "#BC7B3D",
        steel: "#6C676E",
        fighting: "#DE911F",
        ice: "#92C3F4",
        dragon: "#E08B2B",
      },
    },
  },
  plugins: [],
};

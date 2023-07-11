/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      orbitron: ["Orbitron", "sans-serif"],
      audiowide: ["Audiowide", "cursive"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "night",
      "forest",
      {
        mytheme: {
          primary: "#80ffdb",

          secondary: "#64dfdf",

          accent: "#1db9ac",

          neutral: "#18342b",

          "base-100": "#171212",

          info: "#3abff8",

          success: "#36d399",

          warning: "#fbbd23",

          error: "#f87272",
        },
        mytheme2: {
          primary: "#4CC5A5",

          secondary: "#2780fe",

          accent: "#d1d8e2",

          neutral: "#171d2b",

          "base-100": "#171d2b",

          info: "#20fffe",

          success: "#2fc073",

          warning: "#e6ad06",

          error: "#a12d25",
        },
      },
    ],
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Make sure these paths are correct
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        play: ["var(--font-play)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        "body-text": "var(--body-text-font-family)",
        "m3-body-large": "var(--m3-body-large-font-family)",
        "m3-title-medium": "var(--m3-title-medium-font-family)",
        "small-text": "var(--small-text-font-family)",
        subheading: "var(--subheading-font-family)",
      },
      colors: {
        "m-3syslightprimary": "var(--m-3syslightprimary)",
        "m-3syslightsurface": "var(--m-3syslightsurface)",
        "m3syslighton-primary": "var(--m3syslighton-primary)",
        "m3syslighton-primary-container":
          "var(--m3syslighton-primary-container)",
        "m3syslighton-surface": "var(--m3syslighton-surface)",
        "m3syslightprimary-container": "var(--m3syslightprimary-container)",
      },
      boxShadow: {
        "button-shadow": "var(--button-shadow)",
      },
    },
  },
  plugins: [],
};

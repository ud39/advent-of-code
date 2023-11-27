/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      animation: {
        "shine-animation": "shine 3s linear infinite",
        "placeholder-shimmer-animation": "shimmer 2s infinite normal forwards",
      },
      keyframes: {
        shine: {
          "0%,100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        shimmer: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translate(100%)",
          },
        },
      },
    },
  },
  plugins: [],
};

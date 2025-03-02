import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        // Custom shadow using orange-300
        'orange-300': '-4px 4px 20px 2px rgba(253, 186, 116, 0.5)',
        // Custom shadow using blue-300
        'blue-300': '-4px -4px 20px 5px rgb(254, 215, 170, 0.75)',
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;

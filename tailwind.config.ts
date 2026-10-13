import type { Config } from "tailwindcss";


export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        scan: "scan 3s linear infinite",
      },
      keyframes: {
        scan: {
          "0%": { top: "-100%" },
          "100%": { top: "100%" },
        },
      },
      colors: {
        bg: {
          primary: "#0a0612",
          secondary: "#120b20",
          card: "#150e24",
        },
        accent: {
          cyan: "#8b5cf6",
          purple: "#d946ef",
          green: "#22c55e",
          orange: "#ff6b35",
        },
        text: {
          primary: "#e2e8f0",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        space: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.35)",
        "glow-purple": "0 0 20px rgba(139, 92, 246, 0.15)",
      },
    },
  },
  plugins: [],
} satisfies Config;

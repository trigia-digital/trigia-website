import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0B0D",
        "dark-gray": "#17171A",
        "soft-gray": "#F5F5F5",
        orange: "#FF5A1F",
        line: "#2A2A2E",
        "text-dim": "#9A9A9F",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "220% 220%" },
        },
      },
      animation: {
        marquee: "marquee 26s linear infinite",
        borderFlow: "borderFlow 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

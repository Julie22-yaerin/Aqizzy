/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        zalo: {
          DEFAULT: "#0068FF",
          light: "#EBF3FF",
          dark: "#0052CC",
          bubble: "#E5EFFF",
        },
        chalkboard: {
          bg: "#1b2d24",
          border: "#5c3d2e",
          frame: "#8b5a2b",
          chalk: "#fdfefe",
          dust: "#a3b899",
        },
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc5fb",
          400: "#36a6f6",
          500: "#0c87eb",
          600: "#026ac9",
          700: "#0354a2",
          800: "#074785",
          900: "#0c3c6f",
          950: "#082649",
        },
        core: {
          c: "#3b82f6", // Control - Blue
          o: "#8b5cf6", // Ownership - Purple
          r: "#f59e0b", // Reach - Amber
          e: "#10b981", // Endurance - Emerald
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        }
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

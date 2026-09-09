/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgBase: "#050506",
        bgElevated: "#0c0c10",
        surfaceCard: "#141319",
        surfaceCardHover: "#1a1922",
        borderSubtle: "rgba(255, 255, 255, 0.08)",
        borderHover: "rgba(168, 85, 247, 0.35)",
        violetAccent: {
          400: "#C084FC",
          500: "#8B5CF6",
          600: "#7C3AED",
        },
        pinkGlow: "#E879F9",
        textPrimary: "#F5F5F7",
        textSecondary: "#A1A1AA",
        textMuted: "#6B7280",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-heading": "linear-gradient(90deg, #C084FC 0%, #8B5CF6 50%, #7C3AED 100%)",
        "gradient-button": "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
        "gradient-glow": "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.3) 0%, transparent 70%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "aurora-spin": "auroraSpin 25s linear infinite",
      },
      keyframes: {
        auroraSpin: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.1)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "abyss": "#0a0a0f",
        "abyss-light": "#12121a",
        "quantum-gold": "#d4a817",
        "quantum-gold-dim": "#8a6b10",
        "neon-cyan": "#00e5ff",
        "neon-cyan-dim": "#007a8a",
        "plasma-violet": "#7c3aed",
      },
      fontFamily: {
        mono: ["'Fira Code'", "'JetBrains Mono'", "monospace"],
        display: ["'Noto Serif SC'", "'Noto Serif TC'", "serif"],
      },
      animation: {
        "quantum-flicker": "quantumFlicker 0.8s steps(1) infinite",
        "data-stream": "dataStream 2s linear forwards",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
      },
      keyframes: {
        quantumFlicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        dataStream: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 8px #d4a817" },
          "50%": { boxShadow: "0 0 24px #d4a817, 0 0 48px #8a6b10" },
        },
      },
    },
  },
  plugins: [],
};

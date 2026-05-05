/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        elevated: "#1A1A1A",
        muted: "#737373",
        divider: "#E5E5E5",
        adobe: "#FA0F00",
      },
      fontFamily: {
        display: ["'Inter Tight'", "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

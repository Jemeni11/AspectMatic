/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-violet": {
          50: "#efeeff",
          100: "#e2e0ff",
          200: "#cac7fe",
          300: "#aaa5fc",
          400: "#8881f8",
          500: "#6b63f1",
          600: "#4f46e5",
          700: "#4038ca",
          800: "#3730a3",
          900: "#332e81",
          950: "#1e1b4b",
        },
      },
    },
  },
  plugins: [],
  darkMode: ["class", ".figma-dark"],
};

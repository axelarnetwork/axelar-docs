import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        clash: ["Clash Grotesk", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "map-light": "url('/images/map.png')",
      },
      colors: {
        background: {
          DEFAULT: "var(--background)",
          neutral: "var(--background-neutral)",
          "neutral-dark": "var(--background-neutral-dark)",
        },
        primary: {
          DEFAULT: "#EF5D13",
        },
        gray: {
          DEFAULT: "var(--gray)",
          dark: "var(--gray-dark)",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
        },
        border: {
          DEFAULT: "var(--border)",
        },
        text: {
          "dark-gray": "var(--text-dark-gray)",
          gray: "var(--gray)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

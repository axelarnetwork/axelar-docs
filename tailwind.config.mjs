import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        clash: ["Clash Grotesk", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: {
          DEFAULT: "#FAFAFA",
          neutral: "#F5F5F5",
        },
        primary: {
          DEFAULT: "#EF5D13",
        },
        gray: {
          DEFAULT: "#E1E1E1",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

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
        "map-light": "url('/backgrounds/worldmaplight.webp')",
        "map-dark": "url('/backgrounds/worldmapdark.webp')",
        "404-grid-1": "url('/backgrounds/404/grid-1.svg')",
        "404-grid-2": "url('/backgrounds/404/grid-2.svg')",
      },
      typography(theme) {
        return {
          DEFAULT: {
            css: {
              "code::before": {
                content: "none",
              },
              "code::after": {
                content: "none",
              },
              code: {
                backgroundColor: "var(--background-neutral-dark)",
                border: "1px solid var(--border)",

                fontWeight: "400",
                borderRadius: "8px",
                paddingLeft: theme("spacing[1.5]"),
                paddingRight: theme("spacing[1.5]"),
                paddingTop: theme("spacing.1"),
                paddingBottom: theme("spacing.1"),
                wordBreak: "break-word",
              },
            },
          },
        };
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
          para: "var(--para)",
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

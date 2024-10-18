import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";

export default defineConfig({
  integrations: [
    expressiveCode({
      themes: ["vitesse-dark", "light-plus"],
      useDarkModeMediaQuery: true,
      themeCssSelector: (theme) => `[data-theme='${theme.name}']`,
    }),
    react(),
    mdx(),
    sitemap(),
    tailwind(),
  ],
  site: "https://axelardocs.vercel.app",
  trailingSlash: "always",
  markdown: {
    remarkPlugins: [remarkDirective],
  },
});

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";

// const DEFAULT_LAYOUT = "/src/layouts/Section.astro";
// function setDefaultLayout() {
//   return function (_, file) {
//     const { frontmatter } = file.data.astro;
//     if (!frontmatter.layout) frontmatter.layout = DEFAULT_LAYOUT;
//   };
// }

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
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

    // syntaxHighlight: false,
  },
});

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";
import { tip } from "./src/utils/rehype/tip.mjs";
// const DEFAULT_LAYOUT = "/src/layouts/Section.astro";
// function setDefaultLayout() {
//   return function (_, file) {
//     const { frontmatter } = file.data.astro;
//     if (!frontmatter.layout) frontmatter.layout = DEFAULT_LAYOUT;
//   };
// }

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(), sitemap(), tailwind()],
  site: "https://docs.axelar.dev",
  trailingSlash: "always",
  markdown: {
    remarkPlugins: [remarkDirective, tip],

    // syntaxHighlight: false,
  },
});

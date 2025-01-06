import type { AstroGlobal } from "astro";

/** Gets the URL to edit the page on GitHub */

export function getGithubEditUrl(Astro: Readonly<AstroGlobal>) {
  const { content = {} } = Astro.props;
  let currentPage = Astro.url.pathname;
  if (currentPage == "/") {
    return `https://github.com/axelarnetwork/axelar-docs/blob/main/src/pages/index.astro`;
  }
  return `https://github.com/axelarnetwork/axelar-docs/edit/main/src/content/docs/${currentPage.replace(
    /\/$/,
    "",
  )}.mdx`;
}

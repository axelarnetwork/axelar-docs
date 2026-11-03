export const appName = 'Axelar Docs';
export const docsRoute = '/';
// Static social preview image (1200x630), served from `public/`.
export const ogImage = '/open-graph.webp';
export const docsContentRoute = '/llms.mdx';

export const gitConfig = {
  user: 'axelarnetwork',
  repo: 'axelar-docs',
  branch: 'main',
};

// Public origin of the docs, for absolute URLs in the sitemap and llms.txt.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://docs.axelar.dev';

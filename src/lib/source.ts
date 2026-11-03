import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/plugins/lucide-icons';
import type * as PageTree from 'fumadocs-core/page-tree';
import { docsContentRoute, docsRoute } from './shared';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}

// First page of a page-tree node: the folder's index, else its first page at any depth.
export function firstPageUrl(node: PageTree.Node): string | undefined {
  if (node.type === 'page') return node.url;
  if (node.type !== 'folder') return;
  if (node.index) return node.index.url;
  for (const child of node.children) {
    const url = firstPageUrl(child);
    if (url) return url;
  }
}

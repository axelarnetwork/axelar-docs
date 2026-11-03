import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/plugins/lucide-icons';
import { findPath } from 'fumadocs-core/page-tree';
import type * as PageTree from 'fumadocs-core/page-tree';
import { docsContentRoute, docsRoute, siteUrl } from './shared';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

// Browser tab title: the page title and its section, e.g. "Flow limits | ITS".
// An "Overview" page is named after its folder, e.g. "EVM overview | ITS".
export function getPageTabTitle(page: (typeof source)['$inferPage']) {
  const path = findPath(
    source.getPageTree().children,
    (node) => node.type === 'page' && !!node.$ref && node.url === page.url,
  );
  const folders = (path ?? []).filter(
    (node): node is PageTree.Folder => node.type === 'folder',
  );
  const section = folders[0];
  const parent = folders.at(-1);

  let title = page.data.title;
  if (
    title === 'Overview' &&
    parent &&
    parent !== section &&
    typeof parent.name === 'string'
  )
    title = `${parent.name} overview`;
  if (section && typeof section.name === 'string' && section.name !== title)
    title = `${title} | ${section.name}`;
  return title;
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${siteUrl}${page.url})

${absoluteDocsLinks(processed)}

---

All pages of these docs, as Markdown: ${siteUrl}/llms.txt`;
}

// Points links to other docs pages at the absolute URL of their Markdown version,
// so an agent reading a copied page can follow them.
function absoluteDocsLinks(markdown: string): string {
  return markdown.replace(
    /\]\((\/[^)\s#]*)(#[^)\s]*)?\)/g,
    (match, path: string, hash = '') => {
      const page = source.getPage(path.split('/').filter(Boolean));
      if (!page) return match;
      return `](${siteUrl}${getPageMarkdownUrl(page).url}${hash})`;
    },
  );
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

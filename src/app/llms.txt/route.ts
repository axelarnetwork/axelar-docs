import { getPageMarkdownUrl, source } from '@/lib/source';
import { siteUrl } from '@/lib/shared';
import { llms } from 'fumadocs-core/source';

export const revalidate = false;

const header = `# Axelar Docs

> Axelar is a proof-of-stake L1 blockchain that connects other blockchains. Amplifier, the protocol running on it, verifies and routes messages between connected chains. General Message Passing (GMP) lets a contract on one chain call a contract on another, the Interchain Token Service (ITS) deploys and transfers tokens across chains, and the RFQ API returns executable quotes for cross-chain transfers.

Every page below links to its Markdown version. The full text of all pages is at ${siteUrl}/llms-full.txt.

Message status, gas estimates and other live data are available from the Axelarscan API (https://api.axelarscan.io, testnet: https://testnet.api.axelarscan.io); see ${siteUrl}/llms.mdx/gmp/track-and-recover/transaction-states/content.md.
`;

export function GET() {
  // Link each page to its Markdown version, with absolute URLs.
  const markdownUrls = new Map(
    source
      .getPages()
      .map((page) => [page.url, `${siteUrl}${getPageMarkdownUrl(page).url}`]),
  );
  const index = llms(source)
    .index()
    .replace(/^# .*\n/, '')
    .replace(/\]\((\/[^)]*)\)/g, (match, url: string) =>
      markdownUrls.has(url) ? `](${markdownUrls.get(url)})` : match,
    );

  return new Response(`${header}${index}`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}

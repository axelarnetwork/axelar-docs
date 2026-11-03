import { pages } from 'collections/server';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';
import type { Metadata } from 'next';
import { getMDXComponents } from '@/components/mdx';

const page = pages.find((p) => p.info.path === 'terms-of-use.mdx')!;

export const metadata: Metadata = { title: page.title };

export default function TermsOfUsePage() {
  const MDX = page.body;

  return (
    <main className="mx-auto w-full max-w-(--fd-layout-width) flex-1 px-4 py-16">
      <h1 className="mb-8 text-3xl font-semibold">{page.title}</h1>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </main>
  );
}

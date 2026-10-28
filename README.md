# Axelar Docs

The official documentation website for [Axelar](https://github.com/axelarnetwork), built with
[Fumadocs](https://fumadocs.dev) (Next.js, static export).

## Content

Documentation lives in `content/docs` as MDX, split into four sections (sidebar tabs):

- `infrastructure/` — nodes, validators, Amplifier verifiers, chain integration, network resources
- `gmp/` — General Message Passing, gas service, per-chain guides, contract references
- `its/` — Interchain Token Service and token transfers
- `rfq/` — the RFQ API

Each page sets its `title` (and optionally `description`) in frontmatter. Sidebar order and grouping are controlled by
the `meta.json` file in each folder; pages not listed there are still built but hidden from the sidebar.

Standalone pages outside the docs sections (currently the terms of use) live in `content/pages`.

Shared MDX components (callouts, tabs, cards, and the live chain/asset widgets) are registered in
`src/components/mdx.tsx` and can be used in any page without importing them.

## Develop

This repo pins Node via `.nvmrc` and pnpm via the `packageManager` field. With
[nvm](https://github.com/nvm-sh/nvm) installed:

```bash
nvm install       # installs the Node version in .nvmrc
nvm use
corepack enable   # activates the pnpm version pinned in package.json
```

Then:

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Build (static export)

```bash
pnpm build        # outputs a static site to ./out
pnpm start        # serve ./out locally
```

## Deploy (Vercel)

Vercel auto-detects Next.js, runs `pnpm build`, and serves the static `out/` output. `vercel.json` holds redirects from
the old site's URLs to their new locations.

For a custom domain, set `NEXT_PUBLIC_SITE_URL` (e.g. `https://docs.axelar.dev`) in the project's environment variables
so Open Graph and sitemap URLs resolve correctly.

## LLM / AI support

Fumadocs generates machine-readable docs automatically:

- `/llms.txt` — index of all pages for LLMs
- `/llms-full.txt` — full docs content in one file
- `/llms.mdx/<slug>/content.md` — raw markdown per page

# Axelar Docs

- [Axelar Docs](#axelar-docs)
  - [Updating Navigation](#updating-navigation)
  - [How to Contribute to the Docs](#how-to-contribute-to-the-docs)
    - [Here's what you need to know to contribute to the Axelar documentation:](#heres-what-you-need-to-know-to-contribute-to-the-axelar-documentation)
  - [Short links](#short-links)
    - [ITS](#its)

The official documentation website for [Axelar](https://github.com/axelarnetwork).

The project uses [Astro](https://astro.build) and deploys via [Vercel](https://vercel.com). To develop it locally, clone this repository and run the following command to start the local dev server:

```bash
npm install
npm run dev
```

And visit `localhost:3000` to preview your changes.

## Updating Navigation

Site navigation is generated in TypeScript based on the section the user is currently browsing in. The navigation layout is managed in [`src/layouts/navigation.ts`](https://github.com/axelarnetwork/axelar-docs/blob/main/src/layouts/navigation.ts), with pages represented as a `title` and `href` in one of the `children` arrays. The site supports up to 3 levels of nested navigation, with the top level acting as navigation header. Each subsequent level is visually tabbed beneath its parent.

## How to Contribute to the Docs

### Here's what you need to know to contribute to the Axelar documentation:

- Content Folder: Contributions are made by adding files to this [folder](/src/content/docs/). This folder structure defines the organization and links within the documentation.
- Creating a New Page: To add a new page, create a new Markdown file (.md or .mdx) inside the /docs/ folder. Use a descriptive filename that reflects the topic of your page (e.g., /src/content/docs/learn/security.mdx).
- Updating Navigation: Once you've created a new page, you need to update the navigation bar to include it. Edit the file [src/layouts/navigation.ts](#updating-navigation). This file controls the navigation links throughout the Axelar docs website. Locate the appropriate section and add an entry for your new page, ensuring consistency with the existing navigation style.

## Short links

These links redirect to pages in the documentation whose slugs may otherwise be hard to remember.

### ITS

- **Introduction:** https://docs.axelar.dev/its/intro
- **No-Code ITS Setup:** https://docs.axelar.dev/dev/send-tokens/interchain-tokens/quick-start/no-code/
- **Programmatic ITS Setup:** https://docs.axelar.dev/dev/send-tokens/interchain-tokens/quick-start/programmatic/
- **Upgrade Token:** https://docs.axelar.dev/its/upgrade-token
- **Interchain Token Executable:** https://docs.axelar.dev/its/token-executable
- **Flow Limit:** https://docs.axelar.dev/its/flow-limit
- **Programmatically Create a Token:** https://docs.axelar.dev/its/create-token-tutorial
- **Programmatically Create a Canonical Token:** https://docs.axelar.dev/its/canonical-token-tutorial
- **Link Custom Tokens into Interchain Tokens:** https://docs.axelar.dev/its/link-token-tutorial

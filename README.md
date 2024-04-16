# Axelar Docs

The official documentation website for [Axelar](https://github.com/axelarnetwork).

The project uses [Astro](https://astro.build) and deploys via [Vercel](https://vercel.com). To develop it locally, clone this repository and run the following command to start the local dev server:

```bash
npm install
npm run dev
```

And visit `localhost:3000` to preview your changes.

## Updating Navigation

Site navigation is generated in TypeScript based on the section the user is currently browsing in. The navigation layout is managed in [`src/layouts/navigation.ts`](https://github.com/axelarnetwork/axelar-docs/blob/main/src/layouts/navigation.ts), with pages represented as a `title` and `href` in one of the `children` arrays. The site supports up to 3 levels of nested navigation, with the top level acting as navigation header. Each subsequent level is visually tabbed beneath its parent.

## Short links

These links redirect to pages in the documentation whose slugs may otherwise be hard to remember.

### ITS

- **Introduction:** https://docs.axelar.dev/its/intro
- **Create Token:** https://docs.axelar.dev/its/create-token
- **Upgrade Token:** https://docs.axelar.dev/its/upgrade-token
- **Interchain Token Executable:** https://docs.axelar.dev/its/token-executable
- **Rate Limit:** https://docs.axelar.dev/its/rate-limit
- **Programmatically Create a Token:** https://docs.axelar.dev/its/create-token-tutorial
- **Programmatically Create a Canonical Token:** https://docs.axelar.dev/its/canonical-token-tutorial
- **Link Custom Tokens into Interchain Tokens:** https://docs.axelar.dev/its/link-token-tutorial

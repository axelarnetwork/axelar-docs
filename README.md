# Axelar Docs

The official documentation website for [Axelar](https://github.com/axelarnetwork).

The project uses [Astro](https://astro.build) and deploys via [Vercel](https://vercel.com). To develop it locally, clone this repository and run the following command to start the local dev server:

```bash
npm install
npm run dev
```

And visit `localhost:3000` to preview your changes.

## Updating Navigation

When adding new pages, you should add them to the navigation in `src/layouts/navigation.ts`. The navigation is generated in TypeScript based on the section of the site the user is currently browsing. Generally you will just add a new child with a `title` and `href` to one of the arrays. The navigation supports up to 3 level of nested navigation by providing a `children` instead of an `href` property with the top level being a navigation header. Each level level of navigation is visually tabbed beneath its parent.

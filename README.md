# Axelar Docs

The official documentation website for [Axelar](https://github.com/axelarnetwork).

The project uses [Astro](https://astro.build) and deploys via [Vercel](https://vercel.com). To develop it locally, clone this repository and run the following command to start the local dev server:

```bash
npm install
npm run dev
```

And visit `localhost:3000` to preview your changes.

## Updating Navigation

Site navigation is generated in TypeScript based on the section of the site the user is currently browsing. Add new pages to the navigation in `src/layouts/navigation.ts`. In general, a new page will be added as a new child with a `title` and `href` to one of the arrays. The site supports up to 3 levels of nested navigation by providing a `children` instead of an `href` property with the top level being a navigation header. Each level of navigation is visually tabbed beneath its parent.

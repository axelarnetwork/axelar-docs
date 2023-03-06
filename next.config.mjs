import withNextra from "nextra";
import { createSecureHeaders } from "next-secure-headers";
import remarkGfm from "remark-gfm";

/** @type {import('nextra').LoaderOptions} */
const options = {
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  unstable_flexsearch: true,
  unstable_staticImage: true,
  locales: ["en"],
  defaultLocale: "en",
};
const nextra = withNextra(options);

export default nextra({
  headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders(),
      },
    ];
  },
  redirects: () => {
    return [
      {
        source: "/node",
        destination: "/node/config-node",
        permanent: true,
      },
      {
        source: "/validator",
        destination: "/validator/setup",
        permanent: true,
      },
      {
        source: "/validator/setup",
        destination: "/validator/setup/overview",
        permanent: true,
      },
      {
        source: "/validator/external-chains",
        destination: "/validator/external-chains/overview",
        permanent: true,
      },
      {
        source: "/validator/troubleshoot",
        destination: "/validator/troubleshoot/startup",
        permanent: true,
      },
      {
        source: "/resources/mainnet-releases",
        destination: "/resources/mainnet",
        permanent: true,
      },
      {
        source: "/resources/testnet-releases",
        destination: "/resources/testnet",
        permanent: true,
      },
      {
        source: "/releases/:slug*",
        destination: "/resources/:slug*",
        permanent: true,
      },
      {
        source: "/user/:slug*",
        destination: "/resources/:slug*",
        permanent: true,
      },
      {
        source: "/roles/:slug*",
        destination: "/:slug*",
        permanent: true,
      },
      {
        source: "/dev",
        destination: "/dev/intro",
        permanent: true,
      },
      {
        source: "/intro",
        destination: "/learn",
        permanent: true,
      },
      {
        source: "/dev/sdk",
        destination: "/learn/sdk",
        permanent: true,
      },
      {
        source: "/dev/sdk/:slug*",
        destination: "/learn/sdk/:slug*",
        permanent: true,
      },
      {
        source: "/dev/cli",
        destination: "/learn/cli",
        permanent: true,
      },
      {
        source: "/dev/cli/:slug*",
        destination: "/learn/cli/:slug*",
        permanent: true,
      },
      {
        source: "/resources/supported",
        destination: "/dev/chain-names",
        permanent: true,
      },
      {
        source: "/resources/weth",
        destination: "/resources/wrapped-tokens",
        permanent: true,
      },
      {
        source: "/dev/gmp/examples",
        destination: "/dev/build/5-min-starter-examples",
        permanent: true,
      },
      /* This one doesn't work and I have no idea why
      http://localhost:3000/dev/build/chain-names/mainnet always redirects to
      http://localhost:3000/dev/reference/chain-names/mainnet
      !?!?
      */
      {
        source: "/dev/build/chain-names/mainnet",
        destination: "/dev/reference/mainnet-chain-names",
        permanent: true,
      },
      {
        source: "/dev/buid/tokens",
        destination: "/dev/send-tokens/overview",
        permanent: true,
      },
      {
        source: "/dev/gmp/overview",
        destination: "/dev/general-message-passing/overview",
        permanent: true,
      },
      {
        source: "/dev/guides/example-usdc",
        destination: "/dev/guides/example-composable-usdc",
        permanent: true,
      },
      {
        source: '/dev/axelar-sandbox/:path(.*)',
        destination: '/dev/general-message-passing/axelar-sandbox/:path',
        permanent: true,
      },
      {
        source: '/dev/build/5-min-starter-examples',
        destination: '/dev/general-message-passing/examples',
        permanent: true,
      },
      {
        source: '/dev/build/:path(.*)',
        destination: '/dev/general-message-passing/:path',
        permanent: true,
      },
      {
        source: '/dev/debug/:path(.*)',
        destination: '/dev/general-message-passing/debug/:path',
        permanent: true,
      },
      {
        source: '/dev/gas-services/:path(.*)',
        destination: '/dev/general-message-passing/gas-services/:path',
        permanent: true,
      },
      {
        source: '/dev/guides/:path(.*)',
        destination: '/dev/general-message-passing/:path',
        permanent: true,
      },
      {
        source: '/dev/monitor-recover/:path(.*)',
        destination: '/dev/general-message-passing/:path',
        permanent: true,
      },
      {
        source: '/dev/hello-world',
        destination: '/dev/general-message-passing/local-dev',
        permanent: true,
      },
      {
        source: '/dev/gmp-overview',
        destination: '/dev/general-message-passing/overview',
        permanent: true,
      },
      {
        source: '/dev/general-message-passing',
        destination: '/dev/general-message-passing/overview',
        permanent: true,
      },

    ];
  },
});

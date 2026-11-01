import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Provider } from '@/components/provider';
import { appName, ogImage } from '@/lib/shared';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

// Resolve the deployed origin for absolute Open Graph / social image URLs.
// On Vercel this is auto-provided; override with NEXT_PUBLIC_SITE_URL for a custom domain.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | ${appName}`,
    default: appName,
  },
  description:
    'Documentation for Axelar: network infrastructure, General Message Passing, the Interchain Token Service and the RFQ API.',
  // Favicon / touch icon live in `public/` (served from the site root) rather
  // than as Next `app/icon.*` file-convention assets, so they're declared
  // explicitly here for the <link rel="icon"> tags to be emitted on every route.
  icons: {
    icon: [{ url: '/icon.png', sizes: '32x32', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  // Site-wide social defaults. Non-docs routes (e.g. the landing page) inherit
  // these as-is; docs pages redeclare `openGraph` to set `type: 'article'`
  // (Next overwrites, rather than deep-merges, a redeclared `openGraph`), so the
  // shared fields below are repeated in the docs route's generateMetadata.
  openGraph: {
    type: 'website',
    siteName: appName,
    locale: 'en_US',
    url: siteUrl,
    images: ogImage,
  },
  // Cards default to the large-image layout; Next reuses each page's
  // openGraph image for Twitter when no explicit twitter image is set.
  twitter: {
    card: 'summary_large_image',
  },
  // Advertise the machine-readable docs index (llms.txt convention) in the head.
  alternates: {
    types: {
      'text/plain': [{ url: '/llms.txt', title: 'llms.txt' }],
    },
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

import { createMDX } from 'fumadocs-mdx/next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const withMDX = createMDX();

/** @type {(phase: string) => import('next').NextConfig} */
const config = (phase) => ({
  // Static export for builds only: in `next dev`, export mode throws on any path that wasn't
  // pre-rendered (e.g. an old URL) instead of returning a 404.
  output: phase === PHASE_DEVELOPMENT_SERVER ? undefined : 'export',
  // Static export has no image optimization server; serve images as-is.
  images: { unoptimized: true },
  reactStrictMode: true,
});

export default (phase) => withMDX(config(phase));

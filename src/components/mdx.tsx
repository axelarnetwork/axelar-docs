import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/callout';
import { SectionCards } from '@/lib/sections';
import EVMAssets from '@/components/legacy/evm/assets';
import EVMChains from '@/components/legacy/evm/chains';
import IBCChannels from '@/components/legacy/ibc/channels';
import AddKeplr from '@/components/legacy/keplr';
import KeplrCustomNetwork from '@/components/legacy/keplr/custom-network';
import Resources from '@/components/legacy/resources';
import Version from '@/components/legacy/version';
import AddToWeb3 from '@/components/legacy/web3';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    Callout,
    SectionCards,
    // Live data widgets carried over from the Astro site.
    AddKeplr,
    AddToWeb3,
    EVMAssets,
    EVMChains,
    IBCChannels,
    KeplrCustomNetwork,
    Resources,
    Version,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}

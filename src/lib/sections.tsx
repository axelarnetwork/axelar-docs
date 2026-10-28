import { Card, Cards } from 'fumadocs-ui/components/card';
import type { LayoutTab } from 'fumadocs-ui/layouts/shared';
import {
  ArrowLeftRight,
  Coins,
  MessagesSquare,
  Server,
  type LucideIcon,
} from 'lucide-react';
import { firstPageUrl, source } from '@/lib/source';

// Icon and accent color class per section, keyed by the section's top-level folder.
const sectionStyles: Record<string, { icon: LucideIcon; className: string }> = {
  infrastructure: { icon: Server, className: 'text-amber-500' },
  gmp: { icon: MessagesSquare, className: 'text-blue-500' },
  its: { icon: Coins, className: 'text-violet-500' },
  rfq: { icon: ArrowLeftRight, className: 'text-fd-primary' },
};

const tabProps = { className: 'gap-3 px-2.5 py-2' };

function sectionIcon(Icon: LucideIcon, className: string) {
  return <Icon className={`size-full ${className}`} strokeWidth={1.75} />;
}

// Sections are the root folders of the page tree.
function getSections() {
  return source.getPageTree().children.flatMap((node) => {
    if (node.type !== 'folder' || !node.root) return [];
    const url = firstPageUrl(node);
    if (!url) return [];
    const style = sectionStyles[url.split('/')[1]];
    const icon = style && sectionIcon(style.icon, style.className);
    return [{ node, url, icon }];
  });
}

// Section tabs for the sidebar dropdown, with each section's icon and spacing.
export function getSectionTabs(): LayoutTab[] {
  return getSections().map(({ node, url, icon }) => ({
    title: node.name,
    description: node.description,
    url,
    $folder: node,
    icon,
    props: tabProps,
  }));
}

// Card links to every section, for the index page.
export function SectionCards() {
  return (
    <Cards>
      {getSections().map(({ node, url, icon }) => (
        <Card key={url} title={node.name} href={url} icon={icon}>
          {node.description}
        </Card>
      ))}
    </Cards>
  );
}

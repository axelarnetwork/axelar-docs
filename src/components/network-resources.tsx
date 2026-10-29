import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import Copy from '@/components/legacy/copy';
import resources from '@/data/resources.json';

type Environment = keyof typeof resources;

const environments: { id: Environment; label: string }[] = [
  { id: 'mainnet', label: 'Mainnet' },
  { id: 'testnet', label: 'Testnet' },
];

function ResourceList({
  items,
}: {
  items: { title?: string; value: string }[];
}) {
  return (
    <ul>
      {items.map(({ title, value }) => (
        <li key={value}>
          <span className="inline-flex items-center gap-2">
            <a href={value}>{title ?? value}</a>
            <Copy value={value} />
          </span>
        </li>
      ))}
    </ul>
  );
}

// One category of `resources.json` (e.g. "RPC endpoints"), per network. Tabs share a group, so
// picking Testnet once switches every category on the page.
export function NetworkResources({ category }: { category: string }) {
  const available = environments.flatMap(({ id, label }) => {
    const items = resources[id].find((r) => r.name === category)?.value;
    return items?.length ? [{ label, items }] : [];
  });

  if (available.length === 1) {
    return (
      <>
        <p>{available[0].label} only.</p>
        <ResourceList items={available[0].items} />
      </>
    );
  }

  return (
    <Tabs groupId="network" persist items={available.map((e) => e.label)}>
      {available.map(({ label, items }) => (
        <Tab key={label} value={label}>
          <ResourceList items={items} />
        </Tab>
      ))}
    </Tabs>
  );
}

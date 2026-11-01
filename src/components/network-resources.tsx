import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { EndpointList, type EndpointKind } from '@/components/endpoint-check';
import resources from '@/data/resources.json';

type Environment = keyof typeof resources;

const environments: { id: Environment; label: string; chainId: string }[] = [
  { id: 'mainnet', label: 'Mainnet', chainId: 'axelar-dojo-1' },
  { id: 'testnet', label: 'Testnet', chainId: 'axelar-testnet-lisbon-3' },
];

// Categories whose endpoints can be checked from the browser.
const checkable: Record<string, EndpointKind> = {
  'RPC endpoints': 'rpc',
  'LCD endpoints': 'lcd',
  Websocket: 'ws',
};

function CategoryList({
  category,
  items,
  chainId,
}: {
  category: string;
  items: { title?: string; value: string }[];
  chainId: string;
}) {
  return (
    <>
      {category === 'gRPC endpoints' && (
        <p className="text-sm text-fd-muted-foreground">
          Browsers can't make gRPC calls; check these with{' '}
          <code>pnpm check:endpoints</code> from the docs repository.
        </p>
      )}
      <EndpointList
        items={items}
        kind={checkable[category]}
        chainId={chainId}
      />
    </>
  );
}

// One category of `resources.json` (e.g. "RPC endpoints"), per network. Tabs share a group, so
// picking Testnet once switches every category on the page.
export function NetworkResources({ category }: { category: string }) {
  const available = environments.flatMap(({ id, label, chainId }) => {
    const items = resources[id].find((r) => r.name === category)?.value;
    return items?.length ? [{ label, chainId, items }] : [];
  });

  if (available.length === 1) {
    const [{ label, chainId, items }] = available;
    return (
      <>
        <p>{label} only.</p>
        <CategoryList category={category} items={items} chainId={chainId} />
      </>
    );
  }

  return (
    <Tabs groupId="network" persist items={available.map((e) => e.label)}>
      {available.map(({ label, chainId, items }) => (
        <Tab key={label} value={label}>
          <CategoryList category={category} items={items} chainId={chainId} />
        </Tab>
      ))}
    </Tabs>
  );
}

import { useState, useEffect, useMemo } from "react";
import {
  mainnet as mainnetEvmMetadata,
  testnet as testnetEvmMetadata,
} from "../../src/data/evm_chains.json";
import {
  mainnet as mainnetCosmosMetadata,
  testnet as testnetCosmosMetadata,
} from "../../src/data/cosmos_chains.json";
import AddKeplr from "./keplr/add-keplr";

function ChainListRow({ chainId, name, identifier, environment }) {
  return (
    <tr>
      <td>{identifier}</td>
      <td>{name}</td>
      <td>{chainId}</td>
      <td>
        <AddKeplr environment={environment} chain={chainId} />
      </td>
    </tr>
  );
}

const createChainIndex = (chains) => {
  const index = new Map();
  for (const chain of chains) {
    if (index.has(chain.chain_id)) {
      console.error(`duplicate chain ${chain.chain_id}. Removing to be safe`);
      index.delete(chain.chain_id);
    }
    index.set(chain.network_id, chain);
  }
  return index;
};

export default ({ environment }) => {
  const chainIndex = useMemo(() => {
    switch (environment) {
      case `mainnet`:
        return createChainIndex([
          ...mainnetEvmMetadata,
          ...mainnetCosmosMetadata,
        ]);
      case `testnet`:
        return createChainIndex([
          ...testnetEvmMetadata,
          ...testnetCosmosMetadata,
        ]);
      default:
        console.error(`invalid environment ${environment}`);
        return null;
    }
  }, [environment]);

  const [fetching, setFetching] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!response) request();
  }, [response]);

  const request = async () => {
    setFetching(true);

    const endpoint_url =
      environment === `testnet`
        ? `https://lcd-axelar-testnet.imperator.co/axelar/nexus/v1beta1/chains?status=1`
        : `https://lcd-axelar.imperator.co/axelar/nexus/v1beta1/chains?status=1`;

    fetch(endpoint_url)
      .then((data) => data.json())
      .then((chains) => setResponse(chains))
      .catch((error) => setError(true))
      .finally(() => setFetching(false));
  };

  const tableRowData = useMemo(() => {
    if (!response) return null;
    return response.chains.map((chainIdentifier, idx) => {
      const chainData = chainIndex.get(chainIdentifier);
      if (!chainData) {
        console.error(`chain ${chainIdentifier} not found in chain index`);
        return null;
      }

      return (
        <ChainListRow
          key={idx}
          chainId={chainData.chain_id}
          name={chainData.name}
          identifier={chainIdentifier}
          environment={environment}
        />
      );
    });
  }, [response, environment]);

  if (fetching)
    return <div className="mx-1 mt-5 space-y-4">Fetching active chains...</div>;

  if (error)
    return (
      <div className="mx-1 mt-5 space-y-4">
        Error loading chains. Please refresh this page.
      </div>
    );

  return (
    <div className="mx-1 mt-5 space-y-1">
      <table>
        <thead>
          <tr>
            <th>Chain Identifier</th>
            <th>Chain Name</th>
            <th>Chain ID (EVM)</th>
            <th>Add Chain</th>
          </tr>
        </thead>
        <tbody>{tableRowData}</tbody>
      </table>
    </div>
  );
};

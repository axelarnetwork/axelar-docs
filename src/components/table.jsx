import React from 'react';

const Table = () => {
  const headerBackgroundColor = '#808080';

  const data = [
    {
      category: "Amplifier Contracts",
      component: "Chain-specific Amplifier contracts: Gateway, Verifier, Prover",
      description: (<>
        <div>There are three contracts you need to adapt: the Verifier Contract, the Gateway Contract, and the Multisig Prover Contract.</div>
        <br />
        <div>It is up to the integrator to determine how to best utilize the reference contracts, whether that may be by using the reference contracts we expose as is, maintaining a fork, or something else.</div>
      </>),
        links: (
            <>
            <div>TBD - to eventual replace with an INTEGRATION.md file that lives in the axelar-amplifier repo</div>
            <br />
            <a href="https://github.com/axelarnetwork/axelar-amplifier/blob/main/doc/src/contracts/multisig_prover.md">Multisig Prover</a>,{" "}
            <a href="https://github.com/axelarnetwork/axelar-amplifier/blob/main/doc/src/contracts/gateway.md">Gateway</a>,{" "}
            <a href="https://github.com/axelarnetwork/axelar-amplifier/blob/main/doc/src/contracts/voting_verifier.md">Voting Verifier</a></>
        ),
    },
    {
      category: "Amplifier Contracts",
      component: "Internal Contracts on Axelar: Coordinator, Multisig, Router, Service Registry, Rewards, Governance",
      description: (<>
            <div>These contracts are global to the protocol and provide a stable API to integrators. Integrators should not develop or fork any of the protocol contracts.</div>
            <br />
            <div>If there are any changes that need to be made to these contracts (e.g. such as the addition of a new signature scheme that needs to be added to the multisig contract, or message ID validation in the router contract, for example), integrators should expect to coordinate with the Interop Labs team to incorporate those changes.</div>
        </>),
        links: (
            <>
            <div>TBD - to eventual replace with an INTEGRATION.md file that lives in the axelar-amplifier repo</div>
            <br />
            <a href="https://github.com/axelarnetwork/axelar-amplifier/blob/main/doc/src/contracts/coordinator.md">Coordinator</a>,{" "}
            <a href="https://github.com/axelarnetwork/axelar-amplifier/blob/main/doc/src/contracts/multisig.md">Multisig</a>,{" "}
            <a href="https://github.com/axelarnetwork/axelar-amplifier/blob/main/doc/src/contracts/rewards.md">Rewards</a>,{" "}
            <a href="https://github.com/axelarnetwork/axelar-amplifier/blob/main/doc/src/contracts/router.md">Router</a>,{" "}
            <a href="https://github.com/axelarnetwork/axelar-amplifier/blob/main/doc/src/contracts/service_registry.md">Service Registry</a>,{" "}
            <a href="https://github.com/axelarnetwork/axelar-amplifier/blob/main/doc/src/contracts/rewards.md">Rewards</a></>
        ),
    },
    {
      category: "Amplifier Contracts",
      component: "ampd",
      description: (<>
            <div>Ampd is the off-chain daemon responsible for voting and signing within the amplifier protocol. The daemon listens to the Axelar blockchain for specific events, connects to external blockchains via JSON-RPC, and uses tofnd for signing transactions and batches of messages</div>
            <br />
            <div>If a chain does not conform to standard EVM compatibility, a pull request should be made to the Amplifier repo with a new module for that chain. In the future, Interop Labs will expose a plugin architecture to replace the current mechanism - details TBD.</div>
        </>),
      links: <a href="https://github.com/axelarnetwork/axelar-amplifier/blob/main/ampd/README.md">ampd readme</a>
    },
    {
      category: "External Chain Contracts",
        component: "Source Chain Gateway Contract",
        description: "A smart contract implementing the Cross-Chain Gateway Protocol. For EVM chains, the EVM Gateway can be reused.",
        links: (
        <>
            <a href="https://github.com/axelarnetwork/cgp-spec">Cross-Chain Gateway Protocol specifications</a>,{" "}
            <a href="https://github.com/axelarnetwork/axelar-gmp-sdk-solidity/blob/main/contracts/gateway/INTEGRATION.md">Amplifier Gateway Integration</a>
        </>
        ),
    },
    { 
      category: "External Chain Contracts",
        component: "Governance Contract",
        description: "A source chain contract to receive governance-related messages from Axelar, such as updates to your gateway.",
        links: (
            <>
                <a href="https://github.com/axelarnetwork/axelar-gmp-sdk-solidity/tree/main/contracts/governance">Sample governance contracts</a>
            </>
            ),
    },
    {
        category: "External Chain Contracts",
        component: "Gas Service Contract",
        description: "TBD",
        links: "TBD"
      },
    {
        category: "External Chain Contracts",
        component: "ITS",
        description: "ITS",
        links: "TBD"
      },
      {
        category: "External Chain Contracts",
        component: "Squid",
        description: "Squid",
        links: (
            <>
                <a href="https://squidrouter.notion.site/Squid-Router-Contract-Requirements-631c1d99618b432ba712c6b281f17adf">Squid Router contract requirements</a>
            </>)
      },
      {
      category: "Relaying",
      component: "Relayer API components (sentinel, listener, relayer)",
      description: "Relayer API components (sentinel, listener, relayer)",
      links: (<>
        <a href='https://axelar-docs-git-marty-automatic-relaying-axelar-network.vercel.app/dev/amplifier/chain-integration/relay-messages/automatic'>Automated relaying architecture</a>
        <a href="https://github.com/axelarnetwork/axelar-examples/pull/201">TBD - Example utilization</a>
      </>)
    },
    {
      category: "Relaying",
      component: "GMP data collection",
      description: "By leveraging the Relayer API above, GMP events for all transactions are automatically sent to our indexers. More information on the schema of the GMP data and all event types are listed here.",
      links: "TBD - need to flesh out docs on the schema that is produced here"
    },
    {
      category: "Relaying",
      component: "Gas reconciliation and tracking",
      description: "TBD - but this section should go over the accounting of gas payments by users, refunds for overpayments issues by the Relayer API, and the settlement mechanism of discrepancies with accounting",
      links: null
    },
    {
      category: "Verifiers",
      component: "Instantiate verifier set to support the Amplifier chain (fund rewards, etc)",
      description: "[TBU] Today, there is a global set of 30 verifiers ready to support a new chain connection. A new connection will need to coordiate with the verifier set to fund rewards pools and have them initiate chain connections",
      links: "TBD"
    },
    {
      category: "Additional Services",
      component: "Axelarscan APIs (GMP fee estimation, GMP transaction queries)",
      description: "For all supported chains on Axelar, Interop Labs exposes a number of query APIs, such as gas fee estimations, GMP transaction statuses, etc. With some input from you, your chain can be supported as well.",
      links: (
        <>
        <a href="https://docs.axelarscan.io/">Axelarscan API documentation</a>,{" "}
        <br /><br />
        <div>TBD - to eventually replace with an INTEGRATION.md file that walk through CLI process in this repo for adding a chain. This will primarily include basic chain properties, gas assumptions, deployed contract addresses</div>
        <a href="https://github.com/axelarnetwork/axelar-configs/blob/feat/amplifier_config/registry/testnet/amplifier/test-sepolia.json">Sample chain config</a>
        </>
    )
    },
    {
      category: "Additional Services",
      component: "Axelarscan UI (static chain info, verifier performance, GMP data)",
      description: "Once the above config is approved for the Axelarscan APIs, the new chain should appear on Axelarscan UI out of the box!"
    },
    {
      category: "Additional Services",
      component: "AxelarJS SDK Support",
      description: "The AxelarJS SDK is a Javascript wrapper for several helpful utility functions to the Axelar network, including transaction recovery, querying fee estimations, etc. Interop Labs will develop a plugin for you to adapt your chain into these SDKs, expected to be available in Q4",
      links: "TBD"
    },
    {
      category: "Operations & Monitoring",
      component: "Standardized deployment scripts for CICD",
      description: "Standardized deployment scripts for CICD",
      links: "TBD"
    },
    {
      category: "Operations & Monitoring",
      component: "Monitoring for smart contracts (rate limits, large transfers, rotations, etc)",
      description: "Monitoring for smart contracts (rate limits, large transfers, rotations, etc)",
      links: "TBD"
    },
    {
      category: "Operations & Monitoring",
      component: "Monitoring for relaying robustness (missed transactions, recovery, etc)",
      description: "Monitoring for relaying robustness (missed transactions, recovery, etc)",
      links: "TBD"
    },
    {
      category: "Operations & Monitoring",
      component: "(If using Axelar governance) coordinated governance for upgrades",
      description: "(If using Axelar governance) coordinated governance for upgrades",
      links: "TBD"
    },
    {
      category: "Operations & Monitoring",
      component: "Update global chains config",
      description: "Update global chains config",
      links: "TBD"
    },
    {
      category: "Testing",
      component: "Deployment scripts for chains to play well with e2e testing",
      description: "Deployment scripts for chains to play well with e2e testing",
      links: "TBD"
    },
    {
      category: "Testing",
      component: "GMP tests to/from chain",
      description: "GMP tests to/from chain",
      links: "TBD"
    }
  ];

  const renderRows = (data) => {
    let lastCategory = null;

    return data.map((row, index) => {
      let rowSpan = 1;

      if (row.category !== lastCategory) {
        // Count how many rows have the same category
        const sameCategoryRows = data.filter(item => item.category === row.category);
        rowSpan = sameCategoryRows.length;
        lastCategory = row.category;
      }

      return (
        <tr key={index} style={{ backgroundColor: 'transparent' }}>
          {/* Only display the category in the first row with rowspan */}
          {index === 0 || data[index - 1].category !== row.category ? (
            <td rowSpan={rowSpan} style={{ backgroundColor: headerBackgroundColor, fontWeight: 'bold' }}>{row.category}</td>
          ) : null}
          <td>{row.component}</td>
          <td>{row.description}</td>
          <td>{row.links}</td>
        </tr>
      );
    });
  };

  return (
    <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: headerBackgroundColor }}>
          <th>Category</th>
          <th>Component</th>
          <th>Description</th>
          <th>Links</th>
        </tr>
      </thead>
      <tbody>{renderRows(data)}</tbody>
    </table>
  );
};

export default Table;

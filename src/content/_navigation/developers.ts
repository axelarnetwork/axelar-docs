export const developer = {
  header: "Developers",
  subHeader: "Mobius Development Stack (MDS)",
  file: "dev",
  children: [
    {
      title: "What is MDS?",
      file: "what-is-mobius-development-stack",
    },
    {
      title: "Product Overview",
      file: "intro",
    },
    {
      title: "Cross-Chain Token Transfer",
      file: "send-tokens",
      children: [
        {
          title: "Introduction",

          file: "introduction",
        },
        {
          title: "Interchain Tokens",
          file: "interchain-tokens",
          children: [
            {
              title: "Introduction",

              file: "intro",
            },
            {
              title: "Quick Start",
              file: "quick-start",
              children: [
                {
                  title: "No Code",

                  file: "no-code",
                },
                {
                  title: "Programmatic",

                  file: "programmatic",
                },
              ],
            },
            {
              title: "Token Manager",

              file: "token-manager",
            },
            {
              title: "Interchain Token Executable",

              file: "interchain-token-executable",
            },
            {
              title: "Flow Limit",

              file: "flow-limit",
            },
            {
              title: "Developer Guides",
              file: "developer-guides",
              children: [
                {
                  title: "Programmatically Create a Token",

                  file: "programmatically-create-a-token",
                },
                {
                  title: "Programmatically Create a Canonical Token",
                  file: "programmatically-create-a-canonical-token",
                },
                {
                  title: "Link Custom Tokens Into Interchain Tokens",
                  file: "link-custom-tokens-deployed-across-multiple-chains-into-interchain-tokens",
                },
              ],
            },
          ],
        },
        {
          title: "Glossary",

          file: "glossary",
        },
        {
          title: "Roadmap",

          file: "roadmap",
        },
      ],
    },
    {
      title: "General Message Passing",
      file: "general-message-passing",
      children: [
        {
          title: "Introduction",

          file: "overview",
        },
        {
          title: "Examples",

          file: "examples",
        },
        {
          title: "Send Messages",

          file: "gmp-messages",
        },
        {
          title: "Send Messages with Tokens",

          file: "gmp-tokens-with-messages",
        },
        {
          title: "Gas Service",
          file: "gas-service",
          children: [
            {
              title: "Introduction",
              file: "intro",
            },
            {
              title: "Estimate and Pay Gas",
              file: "pay-gas",
            },
            {
              title: "Increase Gas",
              file: "increase-gas",
            },
            {
              title: "Refund Gas",
              file: "refund",
            },
            {
              title: "Specify Gas Refund Address",
              file: "specify-gas-refund-address",
            },
            {
              title: "Transaction States",
              file: "transaction-state",
            },
            {
              title: "Transaction Pricing",
              file: "pricing",
            },
            {
              title: "On-Chain Estimation",
              file: "on-chain-estimation",
            },
          ],
        },
        {
          title: "Monitor Transaction State",

          file: "monitoring",
        },
        {
          title: "Axelar CommandID",

          file: "axelar-commandid",
        },
        {
          title: "Axelar Executable",

          file: "executable",
        },
        {
          title: "Verify GMP Transaction",

          file: "verify-gmp-tx",
        },
        {
          title: "Debug",
          file: "debug",
          children: [
            {
              title: "Error Messages",
              file: "error-debugging",
            },
            {
              title: "Debug a Smart Contract",
              file: "debugging-your-smart-contract",
            },
            {
              title: "Fork Mainnet for Local Testing",
              file: "fork-mainnet",
            },
            {
              title: "Transaction Recovery",
              file: "transaction-recovery",
            },
          ],
        },
        {
          title: "Developer Guides",
          file: "developer-guides",
          children: [
            {
              title: "Cross-Chain Swaps with CCTP",
              file: "example-usdc-cctp",
            },
            {
              title: "Hello World GMP Example",
              file: "example-gmp",
            },
          ],
        },
        {
          title: "Express Service",
          file: "express",
        },
        {
          title: "EVM Relayer",
          file: "evm-relayer",
        },

        {
          title: "Cosmos GMP",
          file: "cosmos-gmp",
          children: [
            { title: "Introduction", file: "overview" },
            {
              title: "Developer Guides",
              file: "developer-guides",
              children: [
                {
                  title: "Cross-Chain Messaging: EVM to Cosmos",
                  file: "cross-chain-messaging-evm-to-cosmos",
                },
              ],
            },
          ],
        },
        {
          file: "solidity-utilities",
        },
        {
          title: "Sandbox",

          file: "axelar-sandbox",
          children: [
            {
              title: "Introduction",
              file: "intro",
            },
            {
              file: "how-to-use",
            },
          ],
        },
      ],
    },
    {
      title: "Amplifier",
      file: "amplifier",
      children: [
        {
          title: "Introduction",
          file: "introduction",
        },
        {
          title: "Integration Overview",
          file: "intergration-overview",
        },
        {
          title: "Integrate a Chain",
          file: "integrate-a-chain",
        },
        {
          title: "Governance Proposals",
          file: "governance-proposals",
        },

        {
          title: "Relay Messages",
          file: "relay-messages",
          children: [
            {
              title: "Automatic Relaying",
              file: "automatic",
            },
            {
              title: "Manual Relaying",
              file: "manual",
            },
          ],
        },
        {
          title: "Add Rewards",
          file: "add-rewards",
        },
        {
          title: "GMP with Amplifier Example",
          file: "gmp-example",
        },
        {
          title: "Common Error Messages",
          file: "error-messages",
        },
        {
          title: "Chain RPC Setup",
          file: "chains/soroban",
        },
        {
          title: "Roadmap",
          file: "roadmap",
        },
      ],
    },
    {
      title: "AxelarJS SDK",
      file: "axelarjs-sdk",
      children: [
        {
          title: "Introduction",
          file: "intro",
        },
        {
          title: "Token Transfer via Deposit Address",
          file: "token-transfer-dep-addr",
        },
        {
          title: "GMP Transaction Status and Recovery",
          file: "tx-status-query-recovery",
        },
        {
          title: "Axelar Query API",
          file: "axelar-query-api",
        },
      ],
    },
    {
      title: "Cosmos GMP",
      file: "cosmos-gmp",
      children: [
        { title: "Introduction", file: "overview" },
        {
          title: "Developer Guides",
          file: "developer-guides",
          children: [
            {
              title: "Cross-Chain Messaging: EVM to Cosmos",
              file: "cross-chain-messaging-evm-to-cosmos",
            },
          ],
        },
      ],
    },

    {
      title: "Chain and Contract Reference",
      file: "reference",
      children: [
        {
          title: "Mainnet Chain Names",
          file: "mainnet-chain-names",
        },
        {
          title: "Mainnet Contract Addresses",
          file: "mainnet-contract-addresses",
        },
        {
          title: "Testnet Chain Names",
          file: "testnet-chain-names",
        },
        {
          title: "Testnet Contract Addresses",
          file: "testnet-contract-addresses",
        },
      ],
    },
    {
      title: "Indexers",
      file: "indexers",
      children: [
        {
          title: "Introduction",
          file: "overview",
        },
        {
          title: "SubQuery",
          file: "subquery",
        },
      ],
    },
  ],
};

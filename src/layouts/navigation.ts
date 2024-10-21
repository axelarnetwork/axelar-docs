export const topLevelNav = [
  {
    title: "Developers",
    href: "/dev/intro/",
  },
  {
    title: "Node Operators",
    href: "/node/config-node/",
  },
  {
    title: "Validators",
    href: "/validator/setup/overview/",
  },
];

export const getNavigation = (section) => {
  const nav: any[] = [];
  if (section === "dev") {
    nav.push({
      header: "Mobius Development Stack (MDS)",
      children: [
        {
          title: "What is MDS?",
          href: "/dev/what-is-mobius-development-stack/",
        },
        {
          title: "Product Overview",
          href: "/dev/intro/",
        },
        {
          title: "Cross-Chain Token Transfer",
          children: [
            { title: "Introduction", href: "/dev/send-tokens/introduction/" },
            {
              title: "Interchain Tokens",
              children: [
                {
                  title: "Introduction",
                  href: "/dev/send-tokens/interchain-tokens/intro/",
                },
                {
                  title: "Quick Start",
                  href: "/dev/send-tokens/interchain-tokens/quick-start/",
                  children: [
                    {
                      title: "No Code",
                      href: "/dev/send-tokens/interchain-tokens/quick-start/no-code/",
                    },
                    {
                      title: "Programmatic",
                      href: "/dev/send-tokens/interchain-tokens/quick-start/programmatic/",
                    },
                  ],
                },
                {
                  title: "Token Manager",
                  href: "/dev/send-tokens/interchain-tokens/token-manager/",
                },
                {
                  title: "Interchain Token Executable",
                  href: "/dev/send-tokens/interchain-tokens/interchain-token-executable/",
                },
                {
                  title: "Flow Limit",
                  href: "/dev/send-tokens/interchain-tokens/flow-limit/",
                },
                {
                  title: "Developer Guides",
                  children: [
                    {
                      title: "Programmatically Create a Token",
                      href: "/dev/send-tokens/interchain-tokens/developer-guides/programmatically-create-a-token/",
                    },
                    {
                      title: "Programmatically Create a Canonical Token",
                      href: "/dev/send-tokens/interchain-tokens/developer-guides/programmatically-create-a-canonical-token/",
                    },
                    {
                      title: "Link Custom Tokens Into Interchain Tokens",
                      href: "/dev/send-tokens/interchain-tokens/developer-guides/link-custom-tokens-deployed-across-multiple-chains-into-interchain-tokens/",
                    },
                  ],
                },
              ],
            },
            {
              title: "Glossary",
              href: "/dev/send-tokens/glossary/",
            },
            {
              title: "Roadmap",
              href: "/dev/send-tokens/roadmap/",
            },
          ],
        },
        {
          title: "General Message Passing",
          children: [
            {
              title: "Introduction",
              href: "/dev/general-message-passing/overview/",
            },
            {
              title: "Examples",
              href: "/dev/general-message-passing/examples/",
            },
            {
              title: "Send Messages",
              href: "/dev/general-message-passing/gmp-messages/",
            },
            {
              title: "Send Messages with Tokens",
              href: "/dev/general-message-passing/gmp-tokens-with-messages/",
            },

            {
              title: "Gas Service",
              children: [
                {
                  title: "Introduction",
                  href: "/dev/gas-service/intro/",
                },
                {
                  title: "Estimate and Pay Gas",
                  href: "/dev/gas-service/pay-gas/",
                },
                {
                  title: "Increase Gas",
                  href: "/dev/gas-service/increase-gas/",
                },
                {
                  title: "Refund Gas",
                  href: "/dev/gas-service/refund/",
                },
                {
                  title: "Specify Gas Refund Address",
                  href: "/dev/gas-service/specify-gas-refund-address/",
                },
                {
                  title: "Transaction States",
                  href: "/dev/gas-service/transaction-state/",
                },
                {
                  title: "Transaction Pricing",
                  href: "/dev/gas-service/pricing/",
                },
                {
                  title: "On-Chain Estimation",
                  href: "/dev/gas-service/on-chain-estimation/",
                },
              ],
            },
            {
              title: "Monitor Transaction State",
              href: "/dev/general-message-passing/monitoring/",
            },
            {
              title: "Axelar CommandID",
              href: "/dev/general-message-passing/axelar-commandid/",
            },
            {
              title: "Axelar Executable",
              href: "/dev/general-message-passing/executable/",
            },
            {
              title: "Verify GMP Transaction",
              href: "/dev/general-message-passing/verify-gmp-tx/",
            },
            {
              title: "Debug",
              children: [
                {
                  title: "Error Messages",
                  href: "/dev/general-message-passing/debug/error-debugging/",
                },
                {
                  title: "Debug a Smart Contract",
                  href: "/dev/general-message-passing/debug/debugging-your-smart-contract/",
                },
                {
                  title: "Fork Mainnet for Local Testing",
                  href: "/dev/general-message-passing/debug/fork-mainnet/",
                },
                {
                  title: "Transaction Recovery",
                  href: "/dev/general-message-passing/debug/transaction-recovery/",
                },
              ],
            },
            {
              title: "Developer Guides",
              children: [
                {
                  title: "Cross-Chain Swaps with CCTP",
                  href: "/dev/general-message-passing/developer-guides/example-usdc-cctp/",
                },
                {
                  title: "Hello World GMP Example",
                  href: "/dev/general-message-passing/developer-guides/example-gmp/",
                },
              ],
            },
            {
              title: "Express Service",
              href: "/dev/general-message-passing/express/",
            },
            {
              title: "EVM Relayer",
              href: "/dev/evm-relayer/",
            },

            {
              title: "Cosmos GMP",
              children: [
                { title: "Introduction", href: "/dev/cosmos-gmp/overview/" },
                {
                  title: "Cosmos 2-way Call Relay",
                  href: "/dev/cosmos-gmp/cosmos-2way-manual-relay/",
                },
                {
                  title: "Developer Guides",
                  children: [
                    {
                      title: "Cross-Chain Messaging: EVM to Cosmos",
                      href: "/dev/cosmos-gmp/developer-guides/cross-chain-messaging-evm-to-cosmos/",
                    },
                  ],
                },
              ],
            },
            {
              title: "Solidity Utilities",
              href: "/dev/solidity-utilities/",
            },
            {
              title: "Sandbox",
              href: "/dev/axelar-sandbox/intro/",
            },
          ],
        },

        {
          title: "Amplifier",
          children: [
            {
              title: "Introduction",
              href: "/dev/amplifier/introduction/",
            },
            {
              title: "Integration Overview",
              href: "/dev/amplifier/chain-integration/introduction/",
            },
            {
              title: "Integrate a Chain",
              href: "/dev/amplifier/chain-integration/integrate-a-chain/",
            },
            {
              title: "Governance Proposals",
              href: "/dev/amplifier/chain-integration/governance-proposals/",
            },
            {
              title: "Relay Messages",
              children: [
                {
                  title: "Automatic Relaying",
                  href: "/dev/amplifier/chain-integration/relay-messages/automatic/",
                },
                {
                  title: "Manual Relaying",
                  href: "/dev/amplifier/chain-integration/relay-messages/manual/",
                },
              ],
            },
            {
              title: "Add Rewards",
              href: "/dev/amplifier/add-rewards/",
            },
            {
              title: "GMP with Amplifier Example",
              href: "/dev/amplifier/gmp-example/",
            },
            {
              title: "Common Error Messages",
              href: "/dev/amplifier/chain-integration/error-messages/",
            },
            {
              title: "Roadmap",
              href: "/dev/amplifier/roadmap/",
            },
          ],
        },
        {
          title: "AxelarJS SDK",
          children: [
            { title: "Introduction", href: "/dev/axelarjs-sdk/intro/" },
            {
              title: "Token Transfer via Deposit Address",
              href: "/dev/axelarjs-sdk/token-transfer-dep-addr/",
            },
            {
              title: "GMP Transaction Status and Recovery",
              href: "/dev/axelarjs-sdk/tx-status-query-recovery/",
            },
            {
              title: "Axelar Query API",
              href: "/dev/axelarjs-sdk/axelar-query-api/",
            },
          ],
        },
        {
          title: "Chain and Contract Reference",
          children: [
            {
              title: "Mainnet Chain Names",
              href: "/dev/reference/mainnet-chain-names/",
            },
            {
              title: "Mainnet Contract Addresses",
              href: "/dev/reference/mainnet-contract-addresses/",
            },
            {
              title: "Testnet Chain Names",
              href: "/dev/reference/testnet-chain-names/",
            },
            {
              title: "Testnet Contract Addresses",
              href: "/dev/reference/testnet-contract-addresses/",
            },
          ],
        },
        {
          title: "Indexers",
          children: [
            {
              title: "Introduction",
              href: "/dev/indexers/overview/",
            },
            {
              title: "SubQuery",
              href: "/dev/indexers/subquery/",
            },
          ],
        },
      ],
    });

    nav.push({
      header: "Contract and SDK reference",
      children: [
        {
          title: "InterchainTokenService",
          href: "https://github.com/axelarnetwork/interchain-token-service/blob/main/contracts/InterchainTokenService.sol/",
        },
        {
          title: "InterchainTokenFactory",
          href: "https://github.com/axelarnetwork/interchain-token-service/blob/main/contracts/InterchainTokenFactory.sol/",
        },
        {
          title: "TokenManager",
          href: "https://github.com/axelarnetwork/interchain-token-service/blob/main/contracts/token-manager/TokenManager.sol/",
        },
        {
          title: "AxelarGateway ",
          href: "https://github.com/axelarnetwork/axelar-cgp-solidity/blob/main/contracts/AxelarGateway.sol/",
        },
        {
          title: "AxelarGasService",
          href: "https://github.com/axelarnetwork/axelar-cgp-solidity/blob/main/contracts/gas-service/AxelarGasService.sol/",
        },
        {
          title: "AxelarExecutable",
          href: "https://github.com/axelarnetwork/axelar-gmp-sdk-solidity/blob/main/contracts/executable/AxelarExecutable.sol/",
        },
      ],
    });
  }
  if (section === "node") {
    nav.push({
      header: "Node Operators",
      children: [
        { title: "Node configuration", href: "/node/config-node/" },
        { title: "Quick sync", href: "/node/join/" },
        { title: "Genesis sync", href: "/node/join-genesis/" },
        { title: "Basic node management", href: "/node/basic/" },
        { title: "CLI configuration", href: "/node/config-cli/" },
        { title: "Keyring backend", href: "/node/keyring/" },
      ],
    });
  }
  if (section === "validator") {
    nav.push({
      header: "Validators",
      children: [
        {
          title: "Setup",
          children: [
            { title: "Overview", href: "/validator/setup/overview/" },
            {
              title: "Configure companion processes",
              href: "/validator/setup/config/",
            },
            {
              title: "Create and back up accounts",
              href: "/validator/setup/backup/",
            },
            {
              title: "Launch companion processes",
              href: "/validator/setup/vald-tofnd/",
            },
            {
              title: "Register broadcaster proxy",
              href: "/validator/setup/register-broadcaster/",
            },
            { title: "Manual setup", href: "/validator/setup/manual/" },
          ],
        },
        {
          title: "External Chain Support",
          children: [
            { title: "Overview", href: "/validator/external-chains/overview/" },
            { title: "Arbitrum", href: "/validator/external-chains/arbitrum/" },
            {
              title: "Avalanche",
              href: "/validator/external-chains/avalanche/",
            },
            { title: "Base", href: "/validator/external-chains/base/" },
            { title: "Binance", href: "/validator/external-chains/binance/" },
            { title: "Blast", href: "/validator/external-chains/blast/" },
            { title: "Celo", href: "/validator/external-chains/celo/" },
            {
              title: "Centrifuge",
              href: "/validator/external-chains/centrifuge/",
            },
            { title: "Ethereum", href: "/validator/external-chains/ethereum/" },
            { title: "Fantom", href: "/validator/external-chains/fantom/" },
            { title: "Filecoin", href: "/validator/external-chains/filecoin/" },
            { title: "Flow", href: "/validator/external-chains/flow/" },
            { title: "Fraxtal", href: "/validator/external-chains/fraxtal/" },
            { title: "Hedera", href: "/validator/external-chains/hedera/" },
            {
              title: "Immutable zkEVM",
              href: "/validator/external-chains/immutable/",
            },
            { title: "Kava", href: "/validator/external-chains/kava/" },
            { title: "Linea", href: "/validator/external-chains/linea/" },
            { title: "Mantle", href: "/validator/external-chains/mantle/" },
            { title: "Moonbeam", href: "/validator/external-chains/moonbeam/" },
            { title: "Optimism", href: "/validator/external-chains/optimism/" },
            { title: "Polygon", href: "/validator/external-chains/polygon/" },
            { title: "Scroll", href: "/validator/external-chains/scroll/" },
            {
              title: "Soroban",
              href: "/validator/external-chains/soroban/",
            },
            { title: "Sui", href: "/validator/external-chains/sui/" },
          ],
        },
        {
          title: "Operations",
          children: [
            {
              title: "Rotate tofnd mnemonics",
              href: "/validator/operations/mnemonic-rotation/",
            },
            {
              title: "Monitor a validator or node",
              href: "/validator/operations/monitoring/",
            },
          ],
        },
        {
          title: "Troubleshoot",
          children: [
            {
              title: "Start-up issues",
              href: "/validator/troubleshoot/startup/",
            },
            {
              title: "Missed too many blocks",
              href: "/validator/troubleshoot/missed-too-many-blocks/",
            },
            {
              title: "Unjail validator",
              href: "/validator/troubleshoot/unjail/",
            },
          ],
        },
        {
          title: "Validator status",
          children: [
            {
              title: "Register external chains",
              href: "/validator/status/register-external-chains/",
            },
            {
              title: "Check validator status",
              href: "/validator/status/health-check/",
            },
            { title: "Leave the network", href: "/validator/status/leave/" },
          ],
        },
        {
          title: "Amplifier",
          children: [
            {
              title: "Become a Verifier",
              href: "/validator/amplifier/verifier-onboarding/",
            },
            {
              title: "Security Expectations",
              href: "/validator/amplifier/verifier-security-expectations/",
            },
            {
              title: "Governance Proposals",
              href: "/validator/amplifier/governance-proposals/",
            },
            {
              title: "Verifier Rewards",
              href: "/validator/amplifier/verifier-rewards/",
            },
            {
              title: "Verifier Rotations",
              href: "/validator/amplifier/verifier-rotations/",
            },
            {
              title: "Common Error Messages",
              href: "/validator/amplifier/error-messages/",
            },
          ],
        },
      ],
    });
  }

  nav.push({
    header: "Resources",
    children: [
      {
        title: "Contract Addresses",
        children: [
          { title: "Mainnet", href: "/resources/contract-addresses/mainnet/" },
          { title: "Testnet", href: "/resources/contract-addresses/testnet/" },
        ],
      },
      {
        title: "RPCs",
        children: [
          { title: "RPC Endpoints", href: "/resources/rpc/resources/" },
          { title: "Free Public RPC", href: "/resources/rpc/lava-iprpc/" },
          { title: "REST Interface", href: "https://axelar.lava.build/" },
        ],
      },
      {
        title: "Static Configs",
        href: "/resources/static-configs/static-configs/",
      },
      {
        title: "Tokens",
        children: [
          { title: "Stake AXL Tokens", href: "/resources/tokens/stake-axl/" },
          {
            title: "Wrap / Unwrap Tokens",
            href: "/resources/tokens/wrapped-tokens/",
          },
        ],
      },
      {
        title: "Axelarscan",
        children: [
          {
            title: "Add Account to Axelarscan",
            href: "/resources/axelarscan/axelarscan-add/",
          },
        ],
      },
      {
        title: "Misc",
        children: [
          { title: "Satellite", href: "/resources/satellite/" },
          { title: "MetaMask", href: "/resources/metamask/" },
          { title: "Add Network to Keplr Wallet", href: "/resources/keplr/" },
        ],
      },
      {
        title: "Upgrades",
        children: [
          {
            title: "Mainnet axelard",
            children: [
              {
                title: "v1.0",
                href: "/resources/mainnet/upgrades/v1/",
              },
              {
                title: "v0.35",
                href: "/resources/mainnet/upgrades/v35/",
              },
              {
                title: "v0.34",
                href: "/resources/mainnet/upgrades/v34/",
              },
              {
                title: "v0.33",
                href: "/resources/mainnet/upgrades/v33/",
              },
              {
                title: "v0.31",
                href: "/resources/mainnet/upgrades/v31/",
              },
              {
                title: "v0.29",
                href: "/resources/mainnet/upgrades/v29/",
              },
              {
                title: "v0.28",
                href: "/resources/mainnet/upgrades/v28/",
              },
              {
                title: "v0.26",
                href: "/resources/mainnet/upgrades/v26/",
              },
              {
                title: "v0.24",
                href: "/resources/mainnet/upgrades/v24/",
              },
              {
                title: "v0.21",
                href: "/resources/mainnet/upgrades/v21/",
              },
              {
                title: "v0.20",
                href: "/resources/mainnet/upgrades/v20/",
              },
              {
                title: "v0.19",
                href: "/resources/mainnet/upgrades/v19/",
              },
              {
                title: "v0.18",
                href: "/resources/mainnet/upgrades/v18/",
              },
              {
                title: "v0.17",
                href: "/resources/mainnet/upgrades/v17/",
              },
              {
                title: "v0.16",
                href: "/resources/mainnet/upgrades/v16/",
              },
            ],
          },
          {
            title: "Testnet axelard",
            children: [
              {
                title: "v1.0",
                href: "/resources/testnet/upgrades/v1/",
              },
              {
                title: "v0.35",
                href: "/resources/testnet/upgrades/v35/",
              },
              {
                title: "v0.34",
                href: "/resources/testnet/upgrades/v34/",
              },
              {
                title: "v0.33",
                href: "/resources/testnet/upgrades/v33/",
              },
              {
                title: "v0.32",
                href: "/resources/testnet/upgrades/v32/",
              },
              {
                title: "v0.31",
                href: "/resources/testnet/upgrades/v31/",
              },
              {
                title: "v0.29",
                href: "/resources/testnet/upgrades/v29/",
              },
              {
                title: "v0.28",
                href: "/resources/testnet/upgrades/v28/",
              },
              {
                title: "v0.27",
                href: "/resources/testnet/upgrades/v27/",
              },
              {
                title: "v0.26",
                href: "/resources/testnet/upgrades/v26/",
              },
              {
                title: "v0.25",
                href: "/resources/testnet/upgrades/v25/",
              },
              {
                title: "v0.24",
                href: "/resources/testnet/upgrades/v24/",
              },
              {
                title: "v0.23",
                href: "/resources/testnet/upgrades/v23/",
              },
              {
                title: "v0.22",
                href: "/resources/testnet/upgrades/v22/",
              },
              {
                title: "v0.21",
                href: "/resources/testnet/upgrades/v21/",
              },
              {
                title: "v0.20",
                href: "/resources/testnet/upgrades/v20/",
              },
              {
                title: "v0.19",
                href: "/resources/testnet/upgrades/v19/",
              },
              {
                title: "v0.18",
                href: "/resources/testnet/upgrades/v18/",
              },
              {
                title: "v0.17",
                href: "/resources/testnet/upgrades/v17/",
              },
            ],
          },
        ],
      },
      {
        title: "Community Pool Proposals",
        href: " /resources/community/community-pool-proposals/",
      },
      {
        title: "Onboard Your IBC chain",
        href: "/resources/ibc-chain-onboarding/",
      },
      { title: "Bug Bounty", href: "/resources/bug-bounty/" },
    ],
  });

  nav.push({
    header: "Learn more about Axelar",
    children: [
      { title: "Crosschain Message Flow", href: "/learn/network/flow/" },
      { title: "axlUSDC", href: "/learn/axlusdc/" },
      { title: "Security Overview", href: "/learn/security/" },
      { title: "Interchain Transaction Duration", href: "/learn/txduration/" },
      { title: "EVM Contract Governance", href: "/learn/evm-governance/" },
      {
        title: "CLI",
        children: [
          { title: "Introduction", href: "/learn/cli/" },
          { title: "Reference", href: "/learn/cli/reference/" },
          { title: "Send UST to an EVM chain", href: "/learn/cli/ust-to-evm/" },
          {
            title: "Redeem UST from an EVM chain",
            href: "/learn/cli/ust-from-evm/",
          },
          { title: "Send AXL to an EVM chain", href: "/learn/cli/axl-to-evm/" },
          {
            title: "Redeem AXL from an EVM chain",
            href: "/learn/cli/axl-from-evm/",
          },
        ],
      },
    ],
  });
  return nav;
};

import { title } from "process";

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
          title: "Products Overview",
          href: "/dev/intro/",
        },
        {
          title: "General Message Passing (GMP)",
          children: [
            {
              title: "Introduction",
              href: "/dev/general-message-passing/overview/",
            },
            {
              title: "EVM",
              children: [
                {
                  title: "Send Messages",
                  href: "/dev/general-message-passing/gmp-messages/",
                },
                {
                  title: "Send Messages with Tokens",
                  href: "/dev/general-message-passing/gmp-tokens-with-messages/",
                },
                {
                  title: "Axelar Executable",
                  href: "/dev/general-message-passing/executable/",
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
                  title: "EVM Relayer",
                  href: "/dev/evm-relayer/",
                },
                {
                  title: "Examples",
                  href: "/dev/general-message-passing/examples/",
                },
              ],
            },
            {
              title: "Cosmos",
              children: [
                {
                  title: "Introduction",
                  href: "/dev/general-message-passing/cosmos-gmp/overview/",
                },
                {
                  title: "Cosmos 2-way Call Relay",
                  href: "/dev/general-message-passing/cosmos-gmp/cosmos-2way-manual-relay/",
                },
                {
                  title: "Developer Guides",
                  children: [
                    {
                      title: "Cross-Chain Messaging: EVM to Cosmos",
                      href: "/dev/general-message-passing/cosmos-gmp/developer-guides/cross-chain-messaging-evm-to-cosmos/",
                    },
                  ],
                },
              ],
            },
            {
              title: "Sui",
              children: [
                {
                  title: "Introduction",
                  href: "/dev/general-message-passing/sui/intro/",
                },
                {
                  title: "GMP Contracts",
                  href: "/dev/general-message-passing/sui/gmp-contracts/",
                },
                {
                  title: "GMP Tutorial",
                  href: "/dev/general-message-passing/sui/gmp-tutorial/",
                },
              ],
            },
            {
              title: "Stellar",
              children: [
                {
                  title: "Introduction",
                  href: "/dev/general-message-passing/stellar-gmp/intro/",
                },
                {
                  title: "Send Messages",
                  href: "/dev/general-message-passing/stellar-gmp/gmp-example/",
                },
              ],
            },
            {
              title: "XRPL",
              href: "/dev/general-message-passing/xrpl/xrpl-gmp/",
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
              title: "Verify GMP Transaction",
              href: "/dev/general-message-passing/verify-gmp-tx/",
            },
            {
              title: "Express Service",
              href: "/dev/general-message-passing/express/",
            },
          ],
        },
        {
          title: "Cross-Chain Token Transfer",
          children: [
            { title: "Introduction", href: "/dev/send-tokens/introduction/" },
            {
              title: "Interchain Token Service",
              children: [
                {
                  title: "Overview",
                  href: "/dev/send-tokens/interchain-tokens/intro/",
                },
                {
                  title: "No Code Setup",
                  href: "/dev/send-tokens/interchain-tokens/no-code/",
                },
                {
                  title: "Create New Interchain Token",
                  href: "/dev/send-tokens/interchain-tokens/create-new-interchain-token/",
                },
                {
                  title: "Register Existing Token",
                  href: "/dev/send-tokens/interchain-tokens/register-existing-token/",
                },
                {
                  title: "Integrate Custom Token",
                  href: "/dev/send-tokens/interchain-tokens/integrate-custom-token/",
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
                  title: "Minter & Operator Roles",
                  href: "/dev/send-tokens/interchain-tokens/minter-operator-roles/",
                },
                {
                  title: "Interchain Transfer",
                  href: "/dev/send-tokens/interchain-tokens/interchain-transfer/",
                },
                {
                  title: "Developer Guides",
                  children: [
                    {
                      title: "Create an Interchain Token",
                      href: "/dev/send-tokens/interchain-tokens/developer-guides/programmatically-create-a-token/",
                    },
                    {
                      title: "Create a Canonical Token",
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
              title: "Integrations",
              children: [
                {
                  title: "Sui",
                  children: [
                    {
                      title: "Overview",
                      href: "/dev/send-tokens/sui/intro/",
                    },
                    {
                      title: "Coin Management",
                      href: "/dev/send-tokens/sui/coin-management/",
                    },
                    {
                      title: "Link Custom Coins",
                      href: "/dev/send-tokens/sui/link-coin/",
                    },
                    {
                      title: "Register an Existing Coin",
                      href: "/dev/send-tokens/sui/register-existing-coin/",
                    },
                    {
                      title: "Register Existing Coin Guide",
                      href: "/dev/send-tokens/sui/register-existing-coin-guide/",
                    },
                  ],
                },
                {
                  title: "Stellar",
                  children: [
                    {
                      title: "Overview",
                      href: "/dev/send-tokens/stellar/intro/",
                    },
                    {
                      title: "Deploy a New Token Demo",
                      href: "/dev/send-tokens/stellar/deploy-new-token/",
                    },
                    {
                      title: "Register an Existing Token Demo",
                      href: "/dev/send-tokens/stellar/register-existing-stellar-token/",
                    },
                    {
                      title: "Link Custom Tokens",
                      href: "https://github.com/axelarnetwork/axelar-contract-deployments/blob/main/stellar/docs/link-token.md",
                    },
                  ],
                },
                {
                  title: "XRPL",
                  href: "/dev/send-tokens/xrpl/xrpl-its/",
                },
              ],
            },
            {
              title: "Roadmap",
              href: "/dev/send-tokens/roadmap/",
            },
            {
              title: "Glossary",
              href: "/dev/send-tokens/glossary/",
            },
            {
              title: "Deprecated",
              children: [
                {
                  title: "Send Tokens",
                  href: "/dev/send-tokens/deprecated/send-tokens/",
                },
                {
                  title: "Deposit Address",
                  href: "/dev/send-tokens/deprecated/deposit-address/",
                },
              ]
            },
          ],
        },

        {
          title: "Chain Integration with Amplifier",
          children: [
            {
              title: "Introduction",
              href: "/dev/amplifier/introduction/",
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
                  href: "https://www.notion.so/bright-ambert-2bd/Amplifier-GMP-API-Authentication-EXTERNAL-113c53fccb77807caeeff9882b883a4c",
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
            {
              title: "ITS Hub",
              children: [
                {
                  title: "Introduction",
                  href: "/dev/amplifier/its-hub/introduction/",
                },
                {
                  title: "Routing Mechanics",
                  href: "/dev/amplifier/its-hub/routing-mechanics/",
                },
              ],
            },
          ],
        },
        {
          title: "Onboard Your IBC chain",
          href: "/dev/ibc-chain-onboarding/",
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
          title: "Tutorials",
          children: [
            {
              title: "Deploy App with Same Address Cross-Chain",
              href: "https://blog.axelar.dev/how-to-deploy-an-application-with-the-same-address-cross-chain/",
            },
            {
              title: "Cross-Chain Governance with OpenZeppelin",
              href: "https://blog.axelar.dev/cross-chain-governance-with-openzeppelin-governor-and-axelar",
            },
            {
              title: "Building Multichain Stablecoins",
              href: "https://blog.axelar.dev/building-multichain-stablecoins-part-one",
            },
            {
              title: "Cross-Chain Memecoins with Axelar",
              href: "https://blog.axelar.dev/cross-chain-memecoins-with-axelar",
            },
            {
              title: "Multichain RWA Lending with GMP",
              href: "https://blog.axelar.dev/multichain-rwa-lending-with-axelar-gmp",
            },
            {
              title: "Full-Stack Interchain App with Next.js & Solidity",
              href: "https://blog.axelar.dev/build-a-full-stack-interchain-application-with-nextjs-solidity-axelar",
            },
          ],
        },
        {
          title: "Chain and Contract Reference",
          children: [
            {
              title: "Mainnet Chain Names",
              href: "https://axelarscan.io/resources/chains",
            },
            {
              title: "Mainnet Contract Addresses",
              href: "/dev/reference/mainnet-contract-addresses/",
            },
            {
              title: "Testnet Chain Names",
              href: "https://testnet.axelarscan.io/resources/chains",
            },
            {
              title: "Testnet Contract Addresses",
              href: "/dev/reference/testnet-contract-addresses/",
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
            { title: "Berachain", href: "/validator/external-chains/berachain/" },
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
            { title: "Hyperliquid", href: "/validator/external-chains/hyperliquid/" },
            {
              title: "Immutable zkEVM",
              href: "/validator/external-chains/immutable/",
            },
            { title: "Kava", href: "/validator/external-chains/kava/" },
            { title: "Linea", href: "/validator/external-chains/linea/" },
            { title: "Mantle", href: "/validator/external-chains/mantle/" },
            { title: "Moonbeam", href: "/validator/external-chains/moonbeam/" },
            { title: "Optimism", href: "/validator/external-chains/optimism/" },
            { title: "Plume", href: "/validator/external-chains/plume/" },
            { title: "Polygon", href: "/validator/external-chains/polygon/" },
            { title: "Scroll", href: "/validator/external-chains/scroll/" },
            { title: "Solana", href: "/validator/external-chains/solana/" },
            { title: "Stacks", href: "/validator/external-chains/stacks/" },
            {
              title: "Stellar",
              href: "/validator/external-chains/stellar/",
            },
            { title: "Sui", href: "/validator/external-chains/sui/" },
            { title: "XRPL EVM", href: "/validator/external-chains/xrpl-evm/" },
            { title: "XRPL", href: "/validator/external-chains/xrpl/" },
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
          { title: "RPC Endpoints", href: "/resources/rpc/resources/" }
        ],
      },
      {
        title: "Static Configs",
        href: "/resources/static-configs/static-configs/",
      },
      {
        title: "Axelar CommandID",
        href: "/resources/axelar-commandid/",
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
            title: "Label Address in Axelarscan",
            href: "/resources/axelarscan/axelarscan-add/",
          },
          {
            title: "Monitor Transaction State",
            href: "/resources/axelarscan/monitoring/",
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
                title: "v1.3",
                href: "https://github.com/axelarnetwork/axelar-contract-deployments/blob/main/releases/axelard/2025-11-v1.3.2.md",
              },
              {
                title: "v1.2",
                href: "/resources/mainnet/upgrades/v121/",
              },
              {
                title: "v1.1",
                href: "/resources/mainnet/upgrades/v112/",
              },
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
                title: "v1.3.1",
                href: "/resources/testnet/upgrades/v131/",
              },
              {
                title: "v1.2",
                href: "/resources/testnet/upgrades/v121/",
              },
              {
                title: "v1.1",
                href: "/resources/testnet/upgrades/v112/",
              },
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
        title: "Chain Integration Reports",
        children: [
          {
            title: "Flow",
            href: "https://github.com/axelarnetwork/amplifier-advisory-committee/blob/main/src/chains/flow-evm/FLOW_EVM_REPORT.md",
          },
        ],
      },

      { title: "Bug Bounty", href: "/resources/bug-bounty/" },
      {
        title: "Solidity Utilities",
        href: "/dev/solidity-utilities/",
      },
    ],
  });

  nav.push({
    header: "Learn more about Axelar",
    children: [
      {
        title: "Connected Chains",
        href: "https://axelarscan.io/resources/chains",
      },
      {
        title: "Live Addresses",
        children: [
          {
            title: "Mainnet",
            href: "https://github.com/axelarnetwork/axelar-contract-deployments/blob/main/axelar-chains-config/info/mainnet.json",
          },
          {
            title: "Testnet",
            href: "https://github.com/axelarnetwork/axelar-contract-deployments/blob/main/axelar-chains-config/info/testnet.json",
          },
          {
            title: "Stagenet",
            href: "https://github.com/axelarnetwork/axelar-contract-deployments/blob/main/axelar-chains-config/info/stagenet.json",
          },
          {
            title: "Devnet",
            href: "https://github.com/axelarnetwork/axelar-contract-deployments/blob/main/axelar-chains-config/info/devnet-amplifier.json",
          },
        ],
      },
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

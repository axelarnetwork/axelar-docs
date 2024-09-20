import { developer } from "./developers";

export const sortedNavigation = [
  developer,

  {
    header: "Node Operators",
    file: "node",
    children: [
      {
        title: "Node configuration",
        file: "config-node",
      },
      {
        title: "Quick sync",
        file: "join",
      },
      {
        title: "Genesis sync",
        file: "join-genesis",
      },
      {
        title: "Basic node management",
        file: "basic",
      },
      {
        title: "CLI configuration",
        file: "config-cli",
      },
      {
        title: "Keyring backend",
        file: "keyring",
      },
    ],
  },

  {
    header: "Validators",
    file: "validators",
    children: [
      {
        title: "Setup",
        file: "setup",
        children: [
          {
            title: "Overview",
            file: "overview",
          },
          {
            title: "Configure companion processes",
            file: "config",
          },
          {
            title: "Create and back up accounts",
            file: "backup",
          },
          {
            title: "Launch companion processes",
            file: "vald-tofnd",
          },
          {
            title: "Register broadcaster proxy",
            file: "register-broadcaster",
          },
          {
            title: "Manual setup",
            file: "manual",
          },
        ],
      },

      {
        title: "External Chain Support",
        file: "external-chains",
        children: [
          {
            title: "Overview",
            file: "overview",
          },
          {
            title: "Arbitrum",
            file: "arbitrum",
          },
          {
            title: "Avalanche",
            file: "avalanche",
          },
          {
            title: "Base",
            file: "base",
          },
          {
            title: "Binance",
            file: "binance",
          },
          {
            title: "Blast",
            file: "blast",
          },
          {
            title: "Celo",
            file: "celo",
          },
          {
            title: "Centrifuge",
            file: "centrifuge",
          },
          {
            title: "Ethereum",
            file: "ethereum",
          },
          {
            title: "Fantom",
            file: "fantom",
          },
          {
            title: "Filecoin",
            file: "filecoin",
          },
          {
            title: "Flow",
            file: "flow",
          },
          {
            title: "Fraxtal",
            file: "fraxtal",
          },
          {
            title: "Hedera",
            file: "hedera",
          },
          {
            title: "Immutable zkEVM",
            file: "immutable",
          },
          {
            title: "Kava",
            file: "kava",
          },
          {
            title: "Linea",
            file: "linea",
          },
          {
            title: "Mantle",
            file: "mantle",
          },
          {
            title: "Moonbeam",
            file: "moonbeam",
          },
          {
            title: "Optimism",
            file: "optimism",
          },
          {
            title: "Polygon",
            file: "polygon",
          },
          {
            title: "Scroll",
            file: "scroll",
          },
          {
            title: "Sui",
            file: "sui",
          },
        ],
      },
      {
        title: "Operations",
        file: "operations",
        children: [
          {
            title: "Rotate tofnd mnemonics",
            file: "mnemonic-rotation",
          },
          {
            title: "Monitor a validator or node",
            file: "monitoring",
          },
        ],
      },
      {
        title: "Troubleshoot",
        file: "troubleshoot",
        children: [
          {
            title: "Start-up issues",
            file: "startup",
          },
          {
            title: "Missed too many blocks",
            file: "missed-too-many-blocks",
          },
          {
            title: "Unjail validator",
            file: "unjail",
          },
        ],
      },
      {
        title: "Validator status",
        file: "status",
        children: [
          {
            title: "Register external chains",
            file: "register-external-chains",
          },
          {
            title: "Check validator status",
            file: "health-check",
          },
          {
            title: "Leave the network",
            file: "leave",
          },
        ],
      },
      {
        title: "Amplifier",
        file: "amplifier",
        children: [
          {
            title: "Become a Verifier",
            file: "verifier-onboarding",
          },
          {
            title: "Security Expectations",
            file: "verifier-security-expectations",
          },
          {
            title: "Governance Proposals",
            file: "governance-proposals",
          },
          {
            title: "Verifier Rewards",
            file: "verifier-rewards",
          },
          {
            title: "Verifier Rotations",
            file: "verifier-rotations",
          },
          {
            title: "Common Error Messages",
            file: "error-messages",
          },
        ],
      },
    ],
  },
  {
    header: "Resources",
    file: "resources",
    children: [
      {
        title: "Contract Addresses",
        file: "contract-addresses",
        children: [
          { title: "Mainnet", file: "mainnet" },
          { title: "Testnet", file: "testnet" },
        ],
      },
      {
        title: "RPCs",
        file: "rpc",
        children: [
          { title: "RPC Endpoints", file: "resources" },
          { title: "Free Public RPC", file: "lava-iprpc" },
        ],
      },
      {
        title: "Static Configs",
        file: "static-configs",
        children: [{ title: "Static Configs", file: "static-configs" }],
      },
      {
        title: "Tokens",
        file: "tokens",
        children: [
          { title: "Stake AXL Tokens", file: "stake-axl" },
          { title: "Wrap / Unwrap Tokens", file: "wrapped-tokens" },
        ],
      },
      {
        title: "Axelarscan",
        file: "axelarscan",
        children: [
          { title: "Add Account to Axelarscan", file: "axelarscan-add" },
        ],
      },
      {
        title: "Misc",
        file: "misc",
        children: [
          { title: "Satellite", href: "/resources/satellite/" },
          { title: "MetaMask", href: "/resources/metamask/" },
          { title: "Add Network to Keplr Wallet", href: "/resources/keplr/" },
        ],
      },

      {
        title: "Community",
        file: "community",
        children: [
          {
            title: "Community Pool Proposals",
            file: "community-pool-proposals",
          },
        ],
      },
      {
        title: "Onboard Your IBC chain",
        file: "ibc-chain-onboarding",
      },
      { title: "Bug Bounty", file: "bug-bounty" },
    ],
  },
  {
    header: "Learn more about Axelar",
    file: "learn",
    children: [
      {
        title: "Crosschain Message Flow",
        file: "network-flow",
      },
      {
        title: "axlUSDC",
        file: "axlusdc",
      },
      {
        title: "Security Overview",
        file: "security",
      },
      {
        title: "Interchain Transaction Duration",
        file: "txduration",
      },
      {
        title: "EVM Contract Governance",
        file: "evm-governance",
      },
      {
        title: "CLI",
        file: "cli",
        children: [
          {
            title: "Introduction",
            file: "cli-introduction",
          },
          {
            title: "Reference",
            file: "cli-reference",
          },
          {
            title: "Send UST to an EVM chain",
            file: "ust-to-evm",
          },
          {
            title: "Redeem UST from an EVM chain",
            file: "ust-from-evm",
          },
          {
            title: "Send AXL to an EVM chain",
            file: "axl-to-evm",
          },
          {
            title: "Redeem AXL from an EVM chain",
            file: "axl-from-evm",
          },
        ],
      },
    ],
  },
];

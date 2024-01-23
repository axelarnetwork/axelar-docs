export const getNavigation = (section) => {
  const nav: any[] = [];
  if (section === "dev") {
    nav.push({
      header: "Developers",
      children: [
        {
          title: "Introduction",
          href: "/dev/intro",
        },
        {
          title: "Cross-Chain Token Transfer",
          children: [
            { title: "Introduction", href: "/dev/send-tokens/overview" },
            {
              title: "Interchain Tokens",
              children: [
                {
                  title: "Introduction",
                  href: "/dev/send-tokens/interchain-tokens/intro",
                },
                {
                  title: "Create Token",
                  href: "/dev/send-tokens/interchain-tokens/create-token",
                },
                {
                  title: "Upgrade Token",
                  href: "/dev/send-tokens/interchain-tokens/upgrade-tokens",
                },
                {
                  title: "Rate Limit",
                  href: "/dev/reference/interchain-token-service-rate-limit",
                },
                {
                  title: "Developer Guides",
                  children: [
                    {
                      title: "Programmatically Create a Token",
                      href: "/dev/send-tokens/interchain-tokens/developer-guides/programmatically-create-a-token",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "General Message Passing",
          children: [
            {
              title: "Overview",
              href: "/dev/general-message-passing/overview",
            },
            {
              title: "Local Development",
              href: "/dev/general-message-passing/local-dev",
            },
            {
              title: "Examples",
              href: "/dev/general-message-passing/examples",
            },
            {
              title: "Send Messages",
              href: "/dev/general-message-passing/gmp-messages",
            },
            {
              title: "Send Messages with Tokens",
              href: "/dev/general-message-passing/gmp-tokens-with-messages",
            },
            {
              title: "Gas Services",
              children: [
                {
                  title: "Introduction",
                  href: "/dev/general-message-passing/gas-services/intro",
                },
                {
                  title: "Pay Gas",
                  href: "/dev/general-message-passing/gas-services/pay-gas",
                },
                {
                  title: "Increase Gas",
                  href: "/dev/general-message-passing/gas-services/increase-gas",
                },
                {
                  title: "Refund",
                  href: "/dev/general-message-passing/gas-services/refund",
                },
              ],
            },
            {
              title: "Debugging",
              children: [
                {
                  title: "Error messages",
                  href: "/dev/general-message-passing/debug/error-debugging",
                },
                {
                  title: "Smart Contract",
                  href: "/dev/general-message-passing/debug/debugging-your-smart-contract",
                },
                {
                  title: "Forking Mainnet",
                  href: "/dev/general-message-passing/debug/fork-mainnet",
                },
              ],
            },
            {
              title: "Recovery",
              href: "/dev/general-message-passing/recovery",
            },
            {
              title: "Monitoring",
              href: "/dev/general-message-passing/monitoring",
            },
            {
              title: "Solidity Utilities",
              href: "/dev/general-message-passing/solidity-utilities",
            },
            {
              title: "Sandbox",
              href: "/dev/general-message-passing/axelar-sandbox/intro",
            },
            {
              title: "Cosmos GMP",
              href: "/dev/general-message-passing/cosmos-gmp",
            },
            {
              title: "USDC CCTP",
              href: "/dev/general-message-passing/example-usdc-cctp",
            },
            {
              title: "AxelarJS SDK",
              children: [
                { title: "Introduction", href: "/dev/axelarjs-sdk/intro" },
                {
                  title: "Token Transfer via Deposit Address",
                  href: "/dev/axelarjs-sdk/token-transfer-dep-addr",
                },
                {
                  title: "GMP transaction status and recovery",
                  href: "/dev/axelarjs-sdk/tx-status-query-recovery",
                },
                {
                  title: "Axelar Query API",
                  href: "/dev/axelarjs-sdk/axelar-query-api",
                },
              ],
            },
          ],
        },
        {
          title: "Indexers",
          children: [
            {
              title: "Overview",
              href: "/dev/indexers/overview",
            },
            {
              title: "SubQuery",
              href: "/dev/indexers/subquery",
            },
          ],
        },
        {
          title: "Reference",
          children: [
            {
              title: "Mainnet Chain Names",
              href: "/dev/reference/mainnet-chain-names",
            },
            {
              title: "Mainnet Contract Addresses",
              href: "/dev/reference/mainnet-contract-addresses",
            },
            {
              title: "Testnet Chain Names",
              href: "/dev/reference/testnet-chain-names",
            },
            {
              title: "Testnet Contract Addresses",
              href: "/dev/reference/testnet-contract-addresses",
            },
            {
              title: "Transaction Pricing",
              href: "/dev/reference/pricing",
            },
            { title: "Glossary", href: "/dev/reference/glossary" },
          ],
        },
      ],
    });
  }
  if (section === "node") {
    nav.push({
      header: "Node Operators",
      children: [
        { title: "Node configuration", href: "/node/config-node" },
        { title: "Quick sync", href: "/node/join" },
        { title: "Genesis sync", href: "/node/join-genesis" },
        { title: "Basic node management", href: "/node/basic" },
        { title: "CLI configuration", href: "/node/config-cli" },
        { title: "Keyring backend", href: "/node/keyring" },
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
            { title: "Overview", href: "/validator/setup/overview" },
            {
              title: "Configure companion processes",
              href: "/validator/setup/config",
            },
            {
              title: "Create and backup accounts",
              href: "/validator/setup/backup",
            },
            {
              title: "Launch companion processes",
              href: "/validator/setup/vald-tofnd",
            },
            {
              title: "Register broadcaster proxy",
              href: "/validator/setup/register-broadcaster",
            },
            { title: "Stake AXL tokens", href: "/validator/setup/stake-axl" },
            { title: "Health check", href: "/validator/setup/health-check" },
            { title: "Manual setup", href: "/validator/setup/manual" },
          ],
        },
        {
          title: "Support External Chains",
          children: [
            { title: "Overview", href: "/validator/external-chains/overview" },
            { title: "Arbitrum", href: "/validator/external-chains/arbitrum" },
            {
              title: "Avalanche",
              href: "/validator/external-chains/avalanche",
            },
            { title: "Base", href: "/validator/external-chains/base" },
            { title: "Binance", href: "/validator/external-chains/binance" },
            { title: "Celo", href: "/validator/external-chains/celo" },
            {
              title: "Centrifuge",
              href: "/validator/external-chains/centrifuge",
            },
            { title: "Ethereum", href: "/validator/external-chains/ethereum" },
            { title: "Fantom", href: "/validator/external-chains/fantom" },
            { title: "Filecoin", href: "/validator/external-chains/filecoin" },
            {
              title: "Immutable zkEVM",
              href: "/validator/external-chains/immutable",
            },
            { title: "Kava", href: "/validator/external-chains/kava" },
            { title: "Linea", href: "/validator/external-chains/linea" },
            { title: "Mantle", href: "/validator/external-chains/mantle" },
            { title: "Moonbeam", href: "/validator/external-chains/moonbeam" },
            { title: "Optimism", href: "/validator/external-chains/optimism" },
            { title: "Polygon", href: "/validator/external-chains/polygon" },
            { title: "Scroll", href: "/validator/external-chains/scroll" },
          ],
        },
        {
          title: "Operations",
          children: [
            {
              title: "Rotating mnemonics",
              href: "/validator/operations/mnemonic-rotation",
            },
            { title: "Monitoring", href: "/validator/operations/monitoring" },
          ],
        },
        {
          title: "Troubleshoot",
          children: [
            {
              title: "Start-up issues",
              href: "/validator/troubleshoot/startup",
            },
            {
              title: "Missed too many blocks",
              href: "/validator/troubleshoot/missed-too-many-blocks",
            },
            {
              title: "Unjail your validator",
              href: "/validator/troubleshoot/unjail",
            },
            {
              title: "Leave the network",
              href: "/validator/troubleshoot/leave",
            },
          ],
        },
      ],
    });
  }
  nav.push({
    header: "Resources",
    children: [
      { title: "Mainnet", href: "/resources/mainnet" },
      { title: "Testnet", href: "/resources/testnet" },
      { title: "RPC Endpoints", href: "/resources/" },
      {
        title: "Community Pool Proposals",
        href: "/resources/governance/community-pool-proposals",
      },
      { title: "Satellite", href: "/resources/satellite" },
      { title: "MetaMask", href: "/resources/metamask" },
      { title: "Add Network to Keplr Wallet", href: "/resources/keplr" },
      { title: "Wrap/unwrap tokens", href: "/resources/wrapped-tokens" },
      { title: "Using ipRPC (Free Public RPC)", href: "/resources/lava-iprpc" },
      { title: "Bug Bounty", href: "/bug-bounty" },
      { title: "Add Account to Axelarscan", href: "/resources/axelarscan-add" },
    ],
  });

  nav.push({
    header: "Learn more about Axelar",
    children: [
      { title: "Crosschain Message Flow", href: "/learn/network/flow" },
      { title: "axlUSDC", href: "/learn/axlusdc" },
      {
        title: "Registering external chains for validators",
        href: "/learn/validators",
      },
      { title: "Security Overview", href: "/learn/security" },
      { title: "Interchain Transaction Duration", href: "/learn/txduration" },
      { title: "EVM Contract Governance", href: "/learn/evm-governance" },
      {
        title: "CLI",
        children: [
          { title: "Introduction", href: "/learn/cli/" },
          { title: "Reference", href: "/learn/cli/reference" },
          { title: "Send UST to an EVM chain", href: "/learn/cli/ust-to-evm" },
          {
            title: "Redeem UST from an EVM chain",
            href: "/learn/cli/ust-from-evm",
          },
          { title: "Send AXL to an EVM chain", href: "/learn/cli/axl-to-evm" },
          {
            title: "Redeem AXL from an EVM chain",
            href: "/learn/cli/axl-from-evm",
          },
        ],
      },
    ],
  });
  return nav;
};

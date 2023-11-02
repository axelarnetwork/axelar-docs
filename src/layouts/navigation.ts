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
          title: "Send Tokens",
          children: [
            { title: "Overview", href: "/dev/send-tokens/overview" },
            {
              title: "Interchain Tokens",
              href: "/dev/send-tokens/interchain-tokens",
            },
          ],
        },
        {
          title: "General Message Passing",
          children: [
            {
              title: "Overview",
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
                  href: "/dev/general-message-passing/gas-services/pay-gas",
                },
                {
                  title: "Smart Contract",
                  href: "/dev/general-message-passing/gas-services/increase-gas",
                },
                {
                  title: "Forking Mainnet",
                  href: "/dev/general-message-passing/gas-services/refund",
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
            { title: "Kava", href: "/validator/external-chains/kava" },
            { title: "Linea", href: "/validator/external-chains/linea" },
            { title: "Mantle", href: "/validator/external-chains/mantle" },
            { title: "Moonbeam", href: "/validator/external-chains/moonbeam" },
            { title: "Optimism", href: "/validator/external-chains/optimism" },
            { title: "Polygon", href: "/validator/external-chains/polygon" },
            { title: "Scroll", href: "/validator/external-chains/scroll" },
            { title: "Aurora", href: "/validator/external-chains/aurora" },
            { title: "Hero", href: "/validator/external-chains/hero" },
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
      { title: "Endpoints and Tools", href: "/resources/" },
      {
        title: "Community Pool Proposals",
        href: "/resources/governance/community-pool-proposals",
      },
      { title: "Satellite", href: "/resources/satellite" },
      { title: "Metamask", href: "/resources/metamask" },
      { title: "Add Network to Keplr Wallet", href: "/resources/keplr" },
      { title: "Wrap/unwrap tokens", href: "/resources/wrapped-tokens" },
      { title: "Using ipRPC (Free Public RPC)", href: "/resources/lava-iprpc" },
      { title: "Bug Bounty", href: "/bug-bounty" },
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

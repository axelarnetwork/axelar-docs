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
                    {
                      title: "Programmatically Create a Canonical Token",
                      href: "/dev/send-tokens/interchain-tokens/developer-guides/programmatically-create-a-canonical-token",
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
              title: "Introduction",
              href: "/dev/general-message-passing/overview",
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
              title: "Monitor Transaction State",
              href: "/dev/general-message-passing/monitoring",
            },
            {
              title: "Debug",
              children: [
                {
                  title: "Error Messages",
                  href: "/dev/general-message-passing/debug/error-debugging",
                },
                {
                  title: "Debug a Smart Contract",
                  href: "/dev/general-message-passing/debug/debugging-your-smart-contract",
                },
                {
                  title: "Fork Mainnet for Local Testing",
                  href: "/dev/general-message-passing/debug/fork-mainnet",
                },
                {
                  title: "Transaction Recovery",
                  href: "/dev/general-message-passing/debug/transaction-recovery",
                },
              ],
            },
            {
              title: "Developer Guides",
              children: [
                {
                  title: "Cross-Chain Swaps with CCTP",
                  href: "/dev/general-message-passing/developer-guides/example-usdc-cctp",
                },
                {
                  title: "Hello World GMP Example",
                  href: "/dev/general-message-passing/developer-guides/example-gmp",
                },
              ],
            },
          ],
        },
        {
          title: "Gas Service",
          children: [
            {
              title: "Introduction",
              href: "/dev/gas-service/intro",
            },
            {
              title: "Pay Gas",
              href: "/dev/gas-service/pay-gas",
            },
            {
              title: "Increase Gas",
              href: "/dev/gas-service/increase-gas",
            },
            {
              title: "Refund Gas",
              href: "/dev/gas-service/refund",
            },
            {
              title: "Transaction Pricing",
              href: "/dev/gas-service/pricing",
            },
          ],
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
              title: "GMP Transaction Status and Recovery",
              href: "/dev/axelarjs-sdk/tx-status-query-recovery",
            },
            {
              title: "Axelar Query API",
              href: "/dev/axelarjs-sdk/axelar-query-api",
            },
          ],
        },
        {
          title: "Cosmos GMP",
          href: "/dev/cosmos-gmp",
        },
        {
          title: "Indexers",
          children: [
            {
              title: "Introduction",
              href: "/dev/indexers/overview",
            },
            {
              title: "SubQuery",
              href: "/dev/indexers/subquery",
            },
          ],
        },
        {
          title: "Chain and Contract Reference",
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
          ],
        },
        {
          title: "Solidity Utilities",
          href: "/dev/solidity-utilities",
        },
        {
          title: "Sandbox",
          href: "/dev/axelar-sandbox/intro",
        },
        {
          title: "Glossary",
          href: "/dev/glossary"
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
              title: "Create and back up accounts",
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
            { title: "Health check", href: "/validator/setup/health-check" },
            { title: "Manual setup", href: "/validator/setup/manual" },
          ],
        },
        {
          title: "External Chain Support",
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
              title: "Rotate tofnd mnemonics",
              href: "/validator/operations/mnemonic-rotation",
            },
            { title: "Monitor a validator or node", href: "/validator/operations/monitoring" },
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
              title: "Unjail validator",
              href: "/validator/troubleshoot/unjail",
            },
          ],
        },
        {
          title: "Validator status",
          children: [
            { title: "Register external chains", href: "/validator/status/register-external-chains" },
            { title: "Check validator status", href: "/validator/status/health-check" },
            { title: "Leave the network", href: "/validator/status/leave" },
          ],
        },
      ],
    });
  }

  nav.push({
    header: "Resources",
    children: [
      {
        title: "Contract addresses",
        children: [
          { title: "Mainnet", href: "/resources/contract-addresses/mainnet" },
          { title: "Testnet", href: "/resources/contract-addresses/testnet" },
        ],
      },
      {
        title: "RPCs",
        children: [
          { title: "RPC Endpoints", href: "/resources/rpc/resources" },
          { title: "Free Public RPC", href: "/resources/rpc/lava-iprpc" },
        ],
      },
      {
        title: "Tokens",
        children: [
          { title: "Stake AXL tokens", href: "/resources/tokens/stake-axl" },
          { title: "Wrap / unwrap tokens", href: "/resources/tokens/wrapped-tokens" },
        ],
      },
      {
        title: "Axelarscan",
        children: [
          { title: "Add Account to Axelarscan", href: "/resources/axelarscan/axelarscan-add" },
        ],
      },
      {
        title: "Misc",
        children: [
          { title: "Satellite", href: "/resources/satellite" },
          { title: "MetaMask", href: "/resources/metamask" },
          { title: "Add Network to Keplr Wallet", href: "/resources/keplr" },
        ],
      },
      {
        title: "Community",
        children: [
          { title: "Community Pool Proposals", href: " /resources/community/community-pool-proposals" },
          { title: "Bug Bounty", href: "/resources/community/bug-bounty" },
        ],
      },
    ],
  });

  nav.push({
    header: "Contract and SDK reference",
    children: [
      {
        title: "InterchainTokenService",
        href: "https://github.com/axelarnetwork/interchain-token-service/blob/main/contracts/InterchainTokenService.sol",
      },
      {
        title: "InterchainTokenFactory",
        href: "https://github.com/axelarnetwork/interchain-token-service/blob/main/contracts/InterchainTokenFactory.sol",
      },
      {
        title: "TokenManager",
        href: "https://github.com/axelarnetwork/interchain-token-service/blob/main/contracts/token-manager/TokenManager.sol",
      },
      {
        title: "AxelarGateway ",
        href: "https://github.com/axelarnetwork/axelar-cgp-solidity/blob/main/contracts/AxelarGateway.sol",
      },
      {
        title: "AxelarGasService",
        href: "https://github.com/axelarnetwork/axelar-cgp-solidity/blob/main/contracts/gas-service/AxelarGasService.sol",
      },
      {
        title: "AxelarExecutable",
        href: "https://github.com/axelarnetwork/axelar-gmp-sdk-solidity/blob/main/contracts/executable/AxelarExecutable.sol",
      },
      {
        title: "AxelarJS SDK",
        href: "https://github.com/axelarnetwork/axelarjs-sdk",
      },
    ],
  });

  nav.push({
    header: "Learn more about Axelar",
    children: [
      { title: "Crosschain Message Flow", href: "/learn/network/flow" },
      { title: "axlUSDC", href: "/learn/axlusdc" },
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

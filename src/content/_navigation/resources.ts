export const resources = {
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
        { title: "Satellite", file: "satellite" },
        { title: "MetaMask", file: "metamask" },
        { title: "Add Network to Keplr Wallet", file: "keplr" },
      ],
    },
    {
      file: "upgrades",
      children: [
        { title: "Mainnet axelard", file: "mainnet" },
        { title: "Testnet axelard", file: "testnet" },
      ],
    },

    {
      title: "Community Pool Proposals",
      file: "community-pool-proposals",
    },

    {
      title: "Onboard Your IBC chain",
      file: "ibc-chain-onboarding",
    },
    { title: "Bug Bounty", file: "bug-bounty" },
  ],
};

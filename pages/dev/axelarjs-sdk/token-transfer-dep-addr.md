
## Get a deposit address

A _deposit address_ is a special address created and monitored by Axelar relayer services on behalf of the requester. It is similar to how centralized exchanges generate a monitored one-time deposit address that facilitate your token transfers.

Deposit address workflow:

1. Generate a deposit address on a specific source chain.
2. User sends tokens to the deposit address on the source chain. Examples: withdrawal from a centralized exchange, transaction from your favorite wallet software.
3. Axelar relayers observe the deposit transaction on the source chain and complete it on the destination chain.
4. Watch your tokens arrive on the destination chain.

### Install the AxelarJS SDK module (AxelarAssetTransfer)

We'll use the AxelarJS SDK, which is a `npm` dependency that empowers developers to make requests into the Axelar network from a frontend. The Axelar SDK provides a wrapper for API calls that you can use to generate a deposit address. (Alternately, see [Send UST to an EVM chain](../../learn/cli/ust-to-evm) for an example of how to generate a deposit address using the CLI instead of the Axelar SDK.)

Install the AxelarJS SDK:

```bash
npm i @axelar-network/axelarjs-sdk
```

Instantiate the `AxelarAssetTransfer` module:

```bash
const sdk = new AxelarAssetTransfer({
  environment: "testnet",
  auth: "local",
});
```

### Generate a deposit address using the SDK

Call `getDepositAddress`:

```tsx
async getDepositAddress(
  fromChain: string, // source chain
  toChain: string, // destination chain
  destinationAddress: string, // destination address to transfer the token to
  asset: string, // common key of the asset
  options?: {
    _traceId: string;
  }
): Promise<string> {}
```

Example: Cosmos-to-EVM (Terra to Avalanche):

```tsx
const sdk = new AxelarAssetTransfer({
  environment: "testnet"
});
const depositAddress = await sdk.getDepositAddress(
  "terra", // source chain
  "avalanche", // destination chain
  "0xF16DfB26e1FEc993E085092563ECFAEaDa7eD7fD", // destination address
  "uusd" // asset to transfer
);
```

Example: EVM-to-Cosmos (Avalanche to Terra)

```tsx
const sdk = new AxelarAssetTransfer({
  environment: "testnet",
  auth: "local",
});
const depositAddress = await sdk.getDepositAddress(
  "avalanche", // source chain
  "terra", // destination chain
  "terra1qem4njhac8azalrav7shvp06myhqldpmkk3p0t", // destination address
  "uusd" // asset to transfer
);
```

Note: The destination address format is validated based on the destination chain. Make sure that the destination address is a valid address on the destination chain. For instance Terra addresses start with “terra,” Osmosis with “osmo,” etc.

Once the deposit address has been generated the user can make a token transfer (on blockchain) to the deposit address. The transfer will be picked up by the Axelar network and relayed to the destination chain.

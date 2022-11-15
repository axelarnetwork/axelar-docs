
# Get a deposit address

A deposit address is a special address created and monitored by Axelar relayer services on behalf of the requester. It is similar to how centralized exchanges generate a monitored, one-time deposit address that facilitates your token transfers.

### Deposit address workflow:

1. Generate a deposit address on a specific source chain.
2. User sends tokens to the deposit address on the source chain. Examples: withdrawal from a centralized exchange, transaction from your favorite wallet software.

IMPORTANT NOTE: When making your deposit, please ensure that the amount is greater than the cross-chain relayer gas fee. 
* A table of fees is listed here: [mainnet](../../resources/mainnet#cross-chain-relayer-gas-fee) | [testnet](../../resources/testnet#cross-chain-relayer-gas-fee). 
* Alternatively, they can be programmatically queried in the SDK's [AxelarQueryAPI](../axelarjs-sdk/axelar-query-api#gettransferfee).

3. Axelar relayers observe the deposit transaction on the source chain and complete it on the destination chain.
4. Watch your tokens arrive on the destination chain.

### 1. Install the AxelarJS SDK module (`AxelarAssetTransfer`)

We'll use the AxelarJS SDK, which is an `npm` dependency that empowers developers to make requests into the Axelar network from a front end. The Axelar SDK provides a wrapper for API calls that you can use to generate a deposit address. (Alternately, you can generate a deposit address using the CLI instead of the Axelar SDK. [See examples, here](../../learn/cli).) 

1. Install the AxelarJS SDK:

```bash
npm i @axelar-network/axelarjs-sdk
```

2. Instantiate the `AxelarAssetTransfer` module:

```bash
const sdk = new AxelarAssetTransfer({
  environment: "testnet"
});
```

### 2. Generate a deposit address using the SDK


* Call `getDepositAddress`
* See accompanying notes at the bottom of this page for important information on method parameters

```tsx
interface GetDepositAddressParams {
  fromChain: string; // See note (3) below
  toChain: string; // See note (3) below
  destinationAddress: string; // See note (1) below
  asset: string; // denom of asset. See note (2) below
  options?: {
    shouldUnwrapIntoNative?: boolean;
    refundAddress?: string; // optional. See note (4) below
  };
}

async getDepositAddress({
  fromChain, toChain, destinationAddress, asset
}: GetDepositAddressParams): Promise<string> {}
```

#### USE CASES
All possible use cases are covered in the scenarios below

##### 1. Send tokens from a Cosmos-based chain

Transfer any Axelar-supported asset from a cosmos-based chain to a destination chain. 
* Destination chains can be either an EVM chain or cosmos-based chain
* When sending to an EVM chain, the asset will arrive as an ERC-20 asset

Example acceptance criteria: 
`I want to send axlUSDC on Osmosis and receive the equivalent ERC-20 version on Avalanche.`

```tsx
const sdk = new AxelarAssetTransfer({ environment: "testnet" });

const fromChain = "osmosis-4", 
  toChain = "avalanche",
  destinationAddress = "0xF16DfB26e1FEc993E085092563ECFAEaDa7eD7fD",
  asset: "uausdc";

const depositAddress = await sdk.getDepositAddress({
  fromChain, 
  toChain, 
  destinationAddress, 
  asset
});
```

##### 2. Send ERC-20 tokens from a EVM chain

Transfer any Axelar-supported ERC-20 asset from an EVM chain to any destination chain.
* Destination chains can be either an EVM chain or cosmos-based chain
* When sending to an EVM chain, the asset will arrive as an ERC-20 asset

Example acceptance criteria: 
`I want to send axlUSDC on Avalanche and receive axlUSDC on Osmosis.`

```tsx
const sdk = new AxelarAssetTransfer({ environment: "testnet" });

const fromChain = "avalanche", 
  toChain = "osmosis-4",
  destinationAddress = "osmo1x3z2vepjd7fhe30epncxjrk0lehq7xdqe8ltsn",
  asset: "uausdc";

const depositAddress = await sdk.getDepositAddress({
  fromChain, 
  toChain, 
  destinationAddress, 
  asset
});
```

##### 3. Send native tokens from a EVM chain

Also known as "wrap", transfer the native asset of an EVM chain to any destination chain.
* Destination chains can be either an EVM chain or cosmos-based chain
* When sending to an EVM chain, the asset will arrive as an ERC-20 "wrapped" asset
* The only difference here vs. case (1) above is that the specified asset is the native asset of the source EVM chain. 

Example acceptance criteria: 
`I want to send AVAX on Avalanche and receive the equivalent ERC-20 version on Polygon.`

```tsx
const sdk = new AxelarAssetTransfer({ environment: "testnet" });

const fromChain = "avalanche", 
  toChain = "polygon",
  destinationAddress = "0xF16DfB26e1FEc993E085092563ECFAEaDa7eD7fD",
  asset: "AVAX"

const depositAddress = await sdk.getDepositAddress({
  fromChain, 
  toChain, 
  destinationAddress, 
  asset
});
```

##### 4. Send a wrapped native token from an EVM chain back to its home EVM chain, e.g. "UNWRAP"

Also known as "wrap", transfer a wrapped native token from an EVM chain back to its home EVM chain
* Both the source and destination chains can only be an EVM chain
* You can specify an optional parameter in the configs for `GetDepositAddressParams` whether you want to receive the asset in the form of native tokens on the destination chain OR its ERC-20 equivalent. 

Two scenarios below

Example acceptance criteria: 
`I want to send WAVAX on Polygon and receive WAVAX on Avalanche.`

```tsx
const sdk = new AxelarAssetTransfer({ environment: "testnet" });

const fromChain = "polygon", 
  toChain = "avalanche",
  destinationAddress = "0xF16DfB26e1FEc993E085092563ECFAEaDa7eD7fD",
  asset: "wavax-wei"

const depositAddress = await sdk.getDepositAddress({
  fromChain, 
  toChain, 
  destinationAddress, 
  asset,
  options: {
    shouldUnwrapIntoNative: false
  }
});
```

Example acceptance criteria: 
`I want to send WAVAX on Polygon and receive AVAX on Avalanche.`

```tsx
const sdk = new AxelarAssetTransfer({ environment: "testnet" });

const fromChain = "polygon", 
  toChain = "avalanche",
  destinationAddress = "0xF16DfB26e1FEc993E085092563ECFAEaDa7eD7fD",
  asset: "wavax-wei"

const depositAddress = await sdk.getDepositAddress({
  fromChain, 
  toChain, 
  destinationAddress, 
  asset,
  options: {
    shouldUnwrapIntoNative: true
  }
});
```

##### Notes

(1) The destination address format is validated based on the destination chain. Make sure the destination address is a valid address on the destination chain. For instance, Osmosis addresses begin with “osmo,” etc.

Once the deposit address has been generated, the user can make a token transfer (on blockchain) to the deposit address. The transfer will be picked up by the Axelar network and relayed to the destination chain.

(2) For all the assets that Axelar supports natively, the network identifies the asset by a `denom`. If you are accustomed to the `symbol` typically used on EVM chains, you will have to convert that `symbol` to a `denom`. The SDK has an API method you can use to convert symbol to denom: [getDenomFromSymbol](./axelar-query-api#getdenomfromsymbol) 

(3) Chain IDs (as recognized by Axelar) must be used here. For example, in testnet, the chain ID for `Osmosis` is `osmosis-4`. 

(4) Refund address is an optional parameter. It specifies the address on a source chain where tokens erroneously deposited into a deposit address can be refunded. For example, if a deposit address was generated to send USDC, but the user mistakenly deposits WAVAX. If no address is specified, the API defaults the parameter to the Gas Receiver contract that can refund on the user's behalf. At the moment, the refundAddress parameter is only compatible for use cases 3 and 4 above, wrap and unwrap cases, respectively.
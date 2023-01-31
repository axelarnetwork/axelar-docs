# Get a deposit address

import Callout from 'nextra-theme-docs/callout'

A deposit address is a special address created and monitored by **Axelar's Relayer Services** on behalf of the requester. It is similar to how centralized exchanges generate a monitored, one-time deposit address that facilitates your token transfers.

### Deposit address workflow

1. The user generates a deposit address on a specific source chain.
2. The user sends tokens to the deposit address on the source chain.

- Examples:

  - withdrawal from a centralized exchange
  - transaction from your favorite wallet software.

<Callout emoji="ℹ️">
IMPORTANT NOTE: When making your deposit, please ensure that the amount is **greater than the cross-chain relayer gas fee**
- A table of fees is listed here: [mainnet](../../resources/mainnet#cross-chain-relayer-gas-fee) | [testnet](../../resources/testnet#cross-chain-relayer-gas-fee).
- Alternatively, they can be programmatically queried in the SDK's [AxelarQueryAPI](../axelarjs-sdk/axelar-query-api#gettransferfee).
</Callout>

3. Axelar relayers observe the deposit transaction on the source chain and complete it on the destination chain, assuming the amount exceeds the requisite fee.
4. Watch your tokens arrive on the destination chain.

### 1. Prerequisite

To help you write clean code, you can use the `Environment` and `CHAINS` constants.

Most methods in the sdk require you to work with chain ids instead of chain names. **Chain ids are unique per Environment** and are _specific to Axelar_. For instance, Ethereum will have a chain id of `ethereum` on mainnet but `ethereum-2` on testnet. In the same way Osmosis will be `osmosis` on mainnet but `osmosis-4` on tesnet. However some chains will have no difference between the chain names and chain ids.

To find the chain ids we support you can check the resources section. You can find the **testnet chain information** [here](/resources/testnet) and **mainnet chain information** [there](/resources/mainnet)

### 2. Install the AxelarJs SDK

The AxelarJS SDK is an `npm` dependency that helps to make requests to the Axelar network. The SDK is essentially a wrapper around various API endpoints. One of the endpoints allows you to generate a deposit address. Alternately, you can create a deposit address using the [CLI instead of the SDK](../../learn/cli).

```bash
npm i @axelar-network/axelarjs-sdk
# or
yarn add @axelar-network/axelarjs-sdk
```

### 3. Import & instantiate the `AxelarAssetTransfer`

```ts
import { AxelarAssetTransfer, Environment } from "@axelar-network/axelarjs-sdk";

const axelarAssetTransfer = new AxelarAssetTransfer({
  environment: Environment.TESTNET,
});
```

### 4. Get an estimate of the transfer fees (optional)

If you plan on using the transfer assets functionality, it is paramount to take the relayer fees into account. Any deposits into a deposit address that are not in excess of this calculate fee will not get processed until that deposit address is topped up to encompass the fee.

The following query retrieves the fee charged by the relayer for a transfer.

```ts
import {
  AxelarQueryAPI,
  CHAINS,
  Environment,
} from "@axelar-network/axelarjs-sdk";

async function main() {
  const axelarQuery = new AxelarQueryAPI({
    environment: Environment.TESTNET,
  });

  const fee = await axelarQuery.getTransferFee(
    CHAINS.TESTNET.OSMOSIS,
    CHAINS.TESTNET.AVALANCHE,
    "uausdc",
    1000000
  );
  // returns  { fee: { denom: 'uausdc', amount: '150000' } }
}

main();
```

### 5. Generate a deposit address

> When making your deposit, please ensure that the amount is greater than the cross-chain relayer gas fee. The relayer gas fee can be calculated with `getTransferFee` function above.

The `AxelarAssetTransfer` class exposes the `getDepositAddress` function. With this function, you can create a **deposit address**. Here is the function signature 👇

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

#### EXAMPLES
All possible use cases are covered in the scenarios below

##### 1. Send tokens from a Cosmos-based chain

Transfer any Axelar-supported asset from a cosmos-based chain to a destination chain. 
* Destination chains can be either an EVM chain or cosmos-based chain
* When sending to an EVM chain, the asset will arrive as an ERC-20 asset

Example acceptance criteria: 
`I want to send axlUSDC on Osmosis and receive the equivalent ERC-20 version on Avalanche.`

```ts
const sdk = new AxelarAssetTransfer({ environment: "testnet" });

const fromChain = CHAINS.TESTNET.OSMOSIS, 
  toChain = CHAINS.TESTNET.AVALANCHE,
  destinationAddress = "0xF16DfB26e1FEc993E085092563ECFAEaDa7eD7fD",
  asset: "uausdc";  // denom of asset. See note (2) below

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

```ts
const sdk = new AxelarAssetTransfer({ environment: "testnet" });

const fromChain = CHAINS.TESTNET.AVALANCHE, 
  toChain = CHAINS.TESTNET.OSMOSIS,
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

```ts
const sdk = new AxelarAssetTransfer({ environment: "testnet" });

const fromChain = CHAINS.TESTNET.AVALANCHE, 
  toChain = CHAINS.TESTNET.POLYGON,
  destinationAddress = "0xF16DfB26e1FEc993E085092563ECFAEaDa7eD7fD",
  asset: "avax"

const depositAddress = await sdk.getDepositAddress({
  fromChain, 
  toChain, 
  destinationAddress, 
  asset
});
```

##### 4. Send a wrapped native token from an EVM chain back to its home EVM chain, e.g. "UNWRAP"

Also known as "wrap", transfer a wrapped native token from an EVM chain back to its home EVM chain
* The destination chain must be the native chain on the wrapped native asset
* You can specify an optional parameter in the configs for `GetDepositAddressParams` whether you want to receive the asset in the form of native tokens on the destination chain OR its ERC-20 equivalent. 

Two scenarios below

Example acceptance criteria: 
`I want to send WAVAX on Polygon and receive WAVAX on Avalanche.`

```ts
const sdk = new AxelarAssetTransfer({ environment: "testnet" });

const fromChain = CHAINS.TESTNET.POLYGON, 
  toChain = CHAINS.TESTNET.AVALANCHE,
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

```ts
const sdk = new AxelarAssetTransfer({ environment: "testnet" });

const fromChain = CHAINS.TESTNET.POLYGON, 
  toChain = CHAINS.TESTNET.AVALANCHE,
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

(1) The destination address format is validated based on the destination chain. Make sure the destination address is a valid address on the destination chain. For instance, Kujira addresses begin with “kujira”, etc.

Once the deposit address has been generated, the user can make a token transfer (on blockchain) to the deposit address. The transfer will be picked up by the Axelar network and relayed to the destination chain.

(2) For all the assets that Axelar supports natively, the network identifies the asset by a `denom`. If you are accustomed to the `symbol` typically used on EVM chains, you will have to convert that `symbol` to a `denom`. The SDK has an API method you can use to convert symbol to denom: [getDenomFromSymbol](./axelar-query-api#getdenomfromsymbol) 

(3) Chain IDs (as recognized by Axelar) must be used here. For example, in testnet, the chain ID for `Osmosis` is `osmosis-5`. 

(4) Refund address is an optional parameter. It specifies the address on a source chain where tokens erroneously deposited into a deposit address can be refunded. For example, if a deposit address was generated to send USDC, but the user mistakenly deposits WAVAX. If no address is specified, the API defaults the parameter to the Gas Receiver contract that can refund on the user's behalf. At the moment, the refundAddress parameter is only compatible for use cases 3 and 4 above, wrap and unwrap cases, respectively.

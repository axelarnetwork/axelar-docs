# Axelar query API

This module is a nice-to-have of common queries made into the Axelar network and its services that are abstracted into easy-to-use JavaScript one-liners.

### Install the AxelarJS SDK module (`AxelarQueryAPI`)

Install the AxelarJS SDK:

```bash
npm i @axelar-network/axelarjs-sdk@alpha
```

Instantiate the `AxelarQueryAPI` module:

```ts
const sdk = new AxelarQueryAPI({
  environment: "testnet",
});
```

### Possible queries

#### `estimateGasFee`

This is a useful query for GMP transactions, when invoking `callContract` or `callContractWithToken` to get an estimate of the appropriate gas payment to be made to the gas receiver on the source chain.

```ts
  /**
   * Calculate estimated gas amount to pay for the gas receiver contract.
   * @param sourceChainId
   * @param destinationChainId
   * @param sourceChainTokenSymbol
   * @param gasLimit (Optional) An estimated gas amount required to execute `executeWithToken` function. The default value is 700000 which should be sufficient for most transactions.
   * @param gasMultiplier (Optional) A multiplier used to create a buffer above the calculated gas fee, to account for potential slippage throughout tx execution, e.g. 1.1 = 10% buffer. supports up to 3 decimal places
   * @returns
   */
  public async estimateGasFee(
    sourceChainId: EvmChain | string,
    destinationChainId: EvmChain | string,
    sourceChainTokenSymbol: GasToken | string,
    gasLimit: number = DEFAULT_ESTIMATED_GAS,
    gasMultiplier = 1.1
  ): Promise<string> 
```

#### getTransferFee

Given a source chain, destination chain and amount of an asset, this query retrieves the base fee that the network would assess for that transaction.

```ts
/**
 * Gets the transfer fee for a given transaction
 * @param sourceChainName
 * @param destinationChainName
 * @param assetDenom
 * @param amountInDenom
 * @returns
 */
public async getTransferFee(
  sourceChainName: string,
  destinationChainName: string,
  assetDenom: string,
  amountInDenom: number
): Promise<TransferFeeResponse>
```

#### getFeeForChainAndAsset

Given a chain and asset, retrieves the base fee that the network would assess.

```ts
/**
 * Gets the fee for a chain and asset
 * @param chainName
 * @param assetDenom
 * @returns
 */
public async getFeeForChainAndAsset(
  chainName: string,
  assetDenom: string
): Promise<FeeInfoResponse>
```

#### getDenomFromSymbol

Get the denom for an asset given its symbol on a chain. For all the assets that Axelar supports natively, the network identifies the asset by a `denom`, while most EVM chains have a `symbol` for the asset. 

The method below allows you to translate the asset symbol (as identified on an EVM chain) to the underlying denom.

```ts
/**
 * @param symbol
 * @param chainName
 * @returns
 */
public async getDenomFromSymbol(symbol: string, chainName: string)
```
For example, let's say you have Axelar's canonical testnet `aUSDC`. The symbol for this asset on EVM chains is `aUSDC`, and the denom is `uausdc`. Sample usage to get denom from symbol:

```ts
  const queryConfig: AxelarQueryAPIConfig = {
    environment: Environment.TESTNET
  }
  const api = new AxelarQueryAPI(queryConfig);

  async function main() {
    const denom = await api.getDenomFromSymbol("aUSDC", "moonbeam");
    console.log("denom: ",denom);
    return denom;
  }

  //expected returned result: uausdc
```


#### getSymbolFromDenom

Get the symbol for an asset on a given chain given its denom. For all the assets that Axelar supports natively, the network identifies the asset by a `denom`, while most EVM chains have a `symbol` for the asset. 

The method below allows you to translate the asset denom to the asset symbol (as identified on an EVM chain).

```ts
/**
 * @param denom
 * @param chainName
 * @returns
 */
public async getSymbolFromDenom(denom: string, chainName: string)
```
For example, let's say you have Axelar's canonical testnet `aUSDC`. The symbol for this asset on EVM chains is `aUSDC`, and the denom is `uausdc`. Sample usage to get symbol from denom:

```ts
  const queryConfig: AxelarQueryAPIConfig = {
    environment: Environment.TESTNET
  }
  const api = new AxelarQueryAPI(queryConfig);

  async function main() {
    const symbol = await api.getSymbolFromDenom("uausdc", "moonbeam");
    console.log("symbol: ",symbol);
    return symbol;
  }

  //expected returned result: aUSDC
```

## Axelar Query API

This module is a nice-to-have of common queries made into the Axelar network and its services that are abstracted into easy-to-use Javascript one-liners. 

### Install the AxelarJS SDK module (AxelarQueryAPI)

Install the AxelarJS SDK:

```bash
    npm i @axelar-network/axelarjs-sdk
```

Instantiate the `AxelarQueryAPI` module:

```bash
    const sdk = new AxelarQueryAPI({
        environment: "testnet"
    });
```

### Possible queries

#### estimateGasFee

Useful query for GMP transactions, when invoking `callContract` or `callContractWithToken` to get an estimate of the appropriate gas payment to be made to the gas receiver on the source chain. 

```bash
  /**
   * Calculate estimated gas amount to pay for the gas receiver contract.
   *
   * @param sourceChainName
   * @param destinationChainName
   * @param sourceChainTokenSymbol
   * @param estimatedGasUsed (Optional) An estimated gas amount required to execute `executeWithToken` function. The default value is 700000 which sufficients for most transaction.
   * @returns
   */
  public async estimateGasFee(
    sourceChainName: EvmChain,
    destinationChainName: EvmChain,
    sourceChainTokenSymbol: GasToken | string,
    estimatedGasUsed = DEFAULT_ESTIMATED_GAS
  ): Promise<string> {
```

#### getTransferFee

Given a source chain, destination chain, and amount of an asset, retrieves the base fee that the network would assess for that transaction

```bash
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

Given a chain and asset, retrieves the base fee that the network would assess

```bash

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

#### getDemonFromSymbol

Get the denom for an asset given its symbol on a chain

```bash
  /**
   * @param symbol 
   * @param chainName 
   * @returns 
   */
  public getDenomFromSymbol(symbol: string, chainName: string)
```

#### getSymbolFromDenom

Get the symbol for an asset on a given chain given its denom

```bash
  /**
   * @param denom 
   * @param chainName 
   * @returns 
   */
  public getSymbolFromDenom(denom: string, chainName: string)
```
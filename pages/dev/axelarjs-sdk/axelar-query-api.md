
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

#### getGasPrice

Useful query for GMP transactions, when invoking `callContract` or `callContractWithToken` to get an estimate of the appropriate gas payment to be made to the gas receiver on the source chain. 

```bash
  /** 
   * Gets the gas price for a destination chain to be paid to the gas receiver on a source chain
   * @param sourceChainName
   * @param destinationChainName
   * @param sourceChainTokenAddress
   * @param sourceChainTokenSymbol
   * @returns
   */
  public async getGasPrice(
    sourceChainName: string,
    destinationChainName: string,
    sourceChainTokenAddress: string,
    sourceChainTokenSymbol: string
  ): Promise<number>
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

#### getFeeForChainAndAsset

Given a source chain, destination chain, and amount of an asset, retrieves the base fee that the network would assess for that transaction

```bash
  /**
   * Gest the transfer fee for a given transaction
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
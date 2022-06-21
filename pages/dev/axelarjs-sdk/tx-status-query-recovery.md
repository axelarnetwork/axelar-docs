
## Query and Recover GMP transactions

Occasionally, transactions can get "stuck" in the pipeline from a source to destination chain (e.g. due to one-off issues that arise with relayers that operate on top of the network).

The `AxelarGMPRecoveryAPI` module in the AxelarJS SDK can be used by your DApp to query the status of any GMP transaction (triggered by either `callContract` or `callContractWithToken`) on the gateway contract of a source chain and trigger a manual relay from source to destination if necessary. 
    - The [[GMP status tracker](../gmp-tracker)] on Axelarscan leverages this feature.

### Install the AxelarJS SDK module (AxelarGMPRecoveryAPI)

Install the AxelarJS SDK:

```bash
    npm i @axelar-network/axelarjs-sdk
```

Instantiate the `AxelarGMPRecoveryAPI` module:

```bash
    const sdk = new AxelarGMPRecoveryAPI({
        environment: "testnet"
    });
```
### Query transaction status by txHash

Invoke `queryTransactionStatus`:

```bash
    const txHash: string = "0xfb6fb85f11496ef58b088116cb611497e87e9c72ff0c9333aa21491e4cdd397a";
    const txStatus: GMPStatusResponse = sdk.queryTransactionStatus(txHash);
```
, where possible status responses for txStatus are outlined below:
```bash
    interface GMPStatusResponse {
        status: GMPStatus;
        details: any;
        call: any;
    }
    enum GMPStatus {
        CALL = "call",
        APPROVED = "approved",
        EXECUTED = "executed",
        ERROR = "error",
        GAS_UNPAID = "gas_unpaid",
    }
```

### Trigger manual relay of transaction through the Axelar network

The following method, once invoked, will:
1. Query the current status of the transaction to be in one of the states above
2. Recover from source to destination if needed. 

```bash
      const txHash = "0xfb6fb85f11496ef58b088116cb611497e87e9c72ff0c9333aa21491e4cdd397a";
      const src = "Ethereum";
      const dest = "Avalanche";
      const debug = true;
      const recover = await api.manualRelayToDestChain({ txHash, src, dest, debug })
```
, where possible return values are:
    - `already executed` - transaction was already executed an a manual recovery was not necessary
    - `triggered relay` - the `manualRelayToDestChain` trigggered a manual relay through our network
    - `approved but not executed` - the transaction already reached the destination chain but was not executed to reach the intended destination contract address
        - => WHEN IN THIS STATE, THERE ARE TWO OPTIONS TO REMEDIATE (BELOW)

### Execute Manually OR Increase Gas Payment

#### 1. Execute manually 

When invoking this method, you will manually execute (and pay for) the executable method on your specified contract on the destination chain of your cross-chain transaction.

```bash
    // TODO: the txState query can be improved
    const testnetCachingServiceAPI: string = "https://testnet.api.gmp.axelarscan.io";
    const txState = await api.execGet(testnetCachingServiceAPI, {
        method: "searchGMP",
        txHash,
    });
    await sdk.executeManually(res[0], (data: any) => console.log(data))
```
, where possible return values are:
```bash
    {
        status: "pending" | "success" | "failed",
        message: "Wait for confirmation" | "Execute successful" | <ERROR>,
        txHash: tx.hash,
    }
```

#### 2. Increase Native Gas Payment 

Invoking this method will execute the `addNativeGas` method on the gas receiver contract on the source chain of your cross-chain transaction to increase the amount of the gas payment, in the form of native tokens.

```bash
    const options: AddGasOptions = {
        amount: "10000000", // Amount of gas to be added. If unspecified, sdk will calculate the amount.
        refundAddress: "", // If not specified, the default value is the tx sender address.
        estimatedGasUsed: 700000, // An amount of gas to execute `executeWithToken` or `execute` function of the custom destination contract. If not specified, the default value is 700000.
        evmWalletDetails: { useWindowEthereum: true, privateKey: "0x" }, // A wallet to send an `addNativeGas` transaction. If not specified, the default value is { useWindowEthereum: true}.
    };
    const SOURCE_GMP_TX_HASH: string = "YOUR_SRC_GMP_TX_HASH";
    const txResult = await api.addNativeGas(EvmChain.AVALANCHE, SOURCE_GMP_TX_HASH, options);

    if (txResult.success) {
        console.log("Added native gas tx:", txResult.transaction?.transactionHash);
    } else {
        console.log("Cannot add native gas", txResult.error);
    }
```

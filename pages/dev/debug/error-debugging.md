# Execution error messages

import Callout from 'nextra-theme-docs/callout'

<Callout emoji="ℹ️">
  The displayed tag is extracted from the data returned by the [Ethers.js](https://github.com/ethers-io/ethers.js/) library, from the data fields `error.error.code` and `error.error.reason`. The displayed error code can be clicked to link to the description of each error code in [Ethers.js's official document](https://docs.ethers.io/v5/api/utils/logger/#errors-ethereum).
</Callout>

There are two reasons that executions fail:

### 1. Insufficient gas to execute the transaction
You might see the yellow tag `NOT ENOUGH GAS` or other messages indicating the submitted gas is too low to execute, such as ``intrinsic gas too low``.


There are two options to solve this problem.

1. Manually execute the payload at the destination chain via [Axelarscan UI](../monitor-recover/recovery#manually-execute-a-transfer) or [AxelarJS SDK](/dev/axelarjs-sdk/tx-status-query-recovery#1-execute-manually).
2. Add more gas to the gas receiver on the source chain via [Axelarscan UI](../monitor-recover/recovery#increase-gas-payment-to-the-gas-receiver-on-the-source-chain) or [AxelarJS SDK](/dev/axelarjs-sdk/tx-status-query-recovery#2-increase-gas-payment).

### 2. Error in the destination contract logic
If the error is caused by the destination contract logic, you would see following the error message: 
```
Transaction execution was reverted. Please check the implementation of the destination contract's _execute function.
```

**What to do next:** We suggest debugging your contract and then making a new call. You can try to follow the [Debugging your smart contract](..//debug/debugging-your-smart-contract) guide.


<Callout emoji="ℹ️">
  If you get `Nonce Expired` or other messages indicates that nonce has already been used. It  means that the nonce you give in the transaction has already been consumed for the address on a blockchain. This error mostly happens when the same address submits multiple calls in a very short period. We suggest you try [manually executing](/dev/monitor-recover/recovery#manually-execute-a-transfer) it once again.
</Callout>

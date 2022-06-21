# `Increase Gas`

When needed, our smart contract can receive gas to top up an existing General Message Passing (GMP) transaction in the following ways:

### `addNativeGas`
Pay additional gas to a transaction that needs it (referenced by its txHash) in native tokens on its EVM source chain.

* In Solidity:

```solidity
function addNativeGas(
    bytes32 txHash,
    uint256 logIndex,
    address refundAddress
) external payable override;
```

* In JavaScript, the SDK abstracts a method that can be invoked directly in a web application.
See SDK docs for [[Increase Native Gas Payment](/dev/axelarjs-sdk/tx-status-query-recovery#2-wip-increase-native-gas-payment).
[//]: # (Is the link accurate?)

### `addGas`
Pay additional gas to a transaction that needs it (referenced by its txHash) in any of Axelar's supported tokens on its EVM source chain.

* In Solidity:

```solidity
function addGas(
    bytes32 txHash,
    uint256 logIndex,
    address gasToken,
    uint256 gasFeeAmount,
    address refundAddress
) external override;
```
* In JavaScript: (WIP - will point to the relevant SDK section)

*** Can only be paid in tokens that Axelar supports. See the list of supported assets for the chains we support in Resources [[Mainnet](/resources/mainnet) | [Testnet](/resources/testnet) | [Testnet-2](/resources/testnet-2)].


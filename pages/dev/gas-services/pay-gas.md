# Pay Gas

The Gas Service contract provides methods to pay the relayer gas fee for both `callContract` and `callContractWithToken`. The fee can be paid in the native token of the source chain or any token supported by Axelar network. The details are as follows.

## Pay gas for the `callContract` method
There are two available methods to pay gas for relaying the `callContract`. You can choose one that match your application design.

### payGasForContractcall
This methods receives any tokens for the relayer fee. The paid gas for this method must be in tokens Axelar supports. See the list of supported assets in Resources [[Mainnet](/resources/mainnet) | [Testnet](/resources/testnet) | [Testnet-2](/resources/testnet-2)].

```solidity
function payGasForContractCall(
    address sender,
    string calldata destinationChain,
    string calldata destinationAddress,
    bytes calldata payload,
    address gasToken,
    uint256 gasFeeAmount,
    address refundAddress
) external;
```

### payNativeGasForContractCall
This method accepts the native tokens of the source chain.

```solidity
// This is called on the source chain before calling the gateway to execute a remote contract.
function payNativeGasForContractCall(
    address sender,
    string calldata destinationChain,
    string calldata destinationAddress,
    bytes calldata payload,
    address refundAddress
) external payable;
```

## Pay gas for the `callContractWithToken` method
Similar to the available pay-gas methods for the `callContract`, there are two available methods to pay gas for relaying the `callContractWithToken`.

### payGasForContractCallWithToken
This methods receives any tokens for the relayer fee. The paid gas for this method must be in tokens Axelar supports. See the list of supported assets in Resources [[Mainnet](/resources/mainnet) | [Testnet](/resources/testnet) | [Testnet-2](/resources/testnet-2)].

```solidity
// This is called on the source chain before calling the gateway to execute a remote contract.
function payGasForContractCallWithToken(
    address sender,
    string calldata destinationChain,
    string calldata destinationAddress,
    bytes calldata payload,
    string calldata symbol,
    uint256 amount,
    address gasToken,
    uint256 gasFeeAmount,
    address refundAddress
) external;
```

### payNativeGasForContractCallWithToken
This method accepts the native tokens of the source chain.

```solidity
// This is called on the source chain before calling the gateway to execute a remote contract.
function payNativeGasForContractCallWithToken(
    address sender,
    string calldata destinationChain,
    string calldata destinationAddress,
    bytes calldata payload,
    string calldata symbol,
    uint256 amount,
    address refundAddress
) external payable;
```

### Methods arguments description
The function names are prety self-explanatory. The following is true for the arguments:

- For all functions
  - `sender` needs to match the address that calls `callContract` or `callContractWithToken` on the `AxelarGateway`. If the `AxelarGasReceiver` is called by the same contract that will call the Gateway then simply specify `address(this)` as `sender`.
- For `payGasForContractCall` and `payNativeGasForContractCall`:
  - `destinationChain`
  - `destinationAddress`
  - `payload`
    need to match the arguments of a `contractCall` on the `AxelarGateway`.
- For `payGasForContractCallWtihToken` and `payNativeGasForContractCallWithToken`:
  - `destinationChain`
  - `destinationAddress`
  - `payload`
  - `symbol`
  - `amount`
    need to match the arguments of a `contractCallWithToken` on the `AxelarGateway`.
- For `payGasForContractCall` and `payGasForContractCallWtihToken`:
  - `gasToken` is the address of the token that gas will be paid in. Ensure this token is supported by the network, using the Axelar API.
  - `gasFeeAmount` is the amount of `gasToken` to transfer from the sender. The sender needs to have approved the `AxelarGasReceiver` with the appropriate amount to `gasToken` first.
- For `payNativeGasForContractCall` and `payNativeGasForContractCallWithToken`, the amount of funds received is specified by `msg.value`.
- For all functions,
  - `refundAddress` is the address that will eventually be able to receive excess amount paid for gas.

## Two-way call
The Executor service supports Two-way call, where a message is sent from a source chain, immediately executed at a destination chain, and sent another message back to the source chain.

The service monitors if there's another contract call immediately executed within the same executed transaction on the destination (to send a message back to the source chain). The service will then automatically uses the remaining pre-paid to relay the second call of the two-way call. 

In case the remaining gas amount (from the first contract call) is insufficient for the second call, the service refunds it to the payer's address. Users still can pay a new gas amount to relay the second call of the transfer through the [Axelar SDK](/dev/axelarjs-sdk/tx-status-query-recovery#2-increase-gas-payment) or [Axelarscan UI](/dev/gmp/gmp-tracker-recovery/recovery#increase-gas-payment-to-the-gas-receiver-on-the-source-chain).
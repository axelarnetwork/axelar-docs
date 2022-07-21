# Pay Gas

* [Overview](/dev/gas-services/pay-gas#overview)
* [Example](/dev/gas-services/pay-gas#example)
* [Alternatives for paying gas for callContract](/dev/gas-services/pay-gas#alternatives-for-paying-gas-for-callcontract)
* [Alternatives for paying gas for callContractWithToken](/dev/gas-services/pay-gas#alternatives-for-paying-gas-for-callcontract)
* [Two-way Call](/dev/gas-services/pay-gas#two-way-call)
## Overview 
The Gas Service contract provides methods to pay the relayer gas fee for both `callContract` and `callContractWithToken`. The fee can be paid in the native token of the source chain or any token supported by Axelar network. An application that wants Axelar to automatically execute contract calls on the destination chain needs to do three things:

1. Estimate the `gasLimit` that the contract call will require on your executable contract on the destination chain.

2. Call the `estimateGasFee` method to get the `sourceGasFee` in the desired gas-payment token on the destination chain. See this [code snippet](/dev/axelarjs-sdk/axelar-query-api#estimategasfee) for reference (Prerequisite: Axelar SDK must be installed. Refer to [AxelarJS SDK](/dev/axelarjs-sdk/intro)).

3. Pay the AxelarGasService smart contract on the source chain in the amount calculated in step 2.

## Example
For example, assume the following smart contract is deployed on a source chain

```solidity
contract SimpleTransferContract {
  ...
  function sendToMany(
      string memory destinationChain,
      string memory destinationContractAddress,
      address[] calldata destinationAddresses,
      string memory symbol,
      uint256 amount
  ) external payable {
      address tokenAddress = gateway.tokenAddresses(symbol);
      IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
      IERC20(tokenAddress).approve(address(gateway), amount);
      bytes memory payload = abi.encode(destinationAddresses);

      if(msg.value > 0) {
          // The line below is where we pay the gas fee
          gasReceiver.payNativeGasForContractCallWithToken{value: msg.value}(
              address(this),
              destinationChain,
              destinationContractAddress,
              payload,
              symbol,
              amount,
              msg.sender
          );
      }
      gateway.callContractWithToken(destinationChain, destinationContractAddress, payload, symbol, amount);
  }
}
```

The `msg.value` is the gas amount we pay to the `AxelarGasService` contract.

So, in the front-end side, we need to pass `sourceGasFee` to `msg.value` like below

```ts
await contract.sendToMany("moonbeam", "0x...", ["0x.."], "USDC", 1, {
  value: sourceGasFee, // This is the value we get from Step 2.
});
```

After sending a transaction out, our service will do the following:

- Monitors `AxelarGasReceiver` for receipt of payment, and gets the amount paid as `amountPaid`.
- Matches those to contract calls.
- Executes the specified contract call, specifying the `gasLimit` defined above.

## Alternatives for paying gas for `callContract`
There are two available methods to pay gas for relaying the `callContract`. You can choose one that match your application design.

### payGasForContractcall
This methods receives any tokens for the relayer fee. The paid gas for this method must be in tokens Axelar supports. See the list of supported assets for the chains we support: [Mainnet](../build/contract-addresses/mainnet) | [Testnet](../build/contract-addresses/testnet).

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

## Alternatives for paying gas for `callContractWithToken`
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

In case the remaining gas amount (from the first contract call) is insufficient for the second call, the service refunds it to the payer's address. Users still can pay a new gas amount to relay the second call of the transfer through the [Axelar SDK](/dev/axelarjs-sdk/tx-status-query-recovery#2-increase-gas-payment) or [Axelarscan UI](/dev/monitor-recover/recovery#increase-gas-payment-to-the-gas-receiver-on-the-source-chain).
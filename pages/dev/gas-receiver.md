# Axelar Gas Receiver

The Axelar Network only validates that a contract call was made from a certain source chain to another destination chain. Execution of the actual contract call is up to the application. We also provide a set of services that can automatically exeute the contract calls on the destination chain by receiving funds on the source chain.

## Introduction

An application that wants Axelar to automatically execute contract calls on the destination chain needs to do four things:

- Estimate the `gasLimit` that the contract call will require on the destionation chain.
- Query our API to get the `sourceTokenPrice` of the desired token that gas will be payed in, as well as `destinationGasPrice` and `destinationTokenPrice`, the price of the native token, on the destination chain.
- Calcualate the amount of token to be payed as `gasLimit * destinationGasPrice * gestinationTokenPrice / sourceTokenPrice`.
- Pay our `AxelarGasReceiver` smart contract on the source chain that amount. This can be done by the application's smart contracts so no additional transactions are required (except maybe approval in case gas is payed in non-native tokens).

Our service does the following:

- Monitors `AxelarGasReceiver` for receipts of payment, and gets the amount payed as `amountPayed`.
- Matches those to contract calls.
- Queries our API to get the `sourceTokenPrice` of the token that gas was payed in, as well as `destinationGasPrice` and `destinationTokenPrice`, the price of the native token, on the destination chain.
- Calcualate the `gasLimit` as `amountPayed * sourceTokenPrice / (destinationGasPrice * gestinationTokenPrice)`.
- Executes the specified contract call specifying a the `gasLimit` specified above.

We plan to add an option to get refunds in case excecive amounts are payed as gas, but this is not yet implemented.

## `AxelarGasReceiver`

Our smart contract can receive gas in the following ways:

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

The function names are prety self explenatory. The following is true for the arguments:

- For all functions
  - `sender` needs to match the address that calls `callContrat` or `callContractWithToken` on the `AxelarGateway`. If the `AxelarGasReceiver` is called by the same contract that will call the gateway then simply specify `address(this)` as `sender`.
- For `payGasForContractCall` and `payNativeGasForContractCall`
  - `destinationChain`
  - `destinationAddress`
  - `payload`
need to match the arguments of a `contractCall` on the `AxelarGateway`
- For `payGasForContractCallWtihToken` and `payNativeGasForContractCallWithToken`
  - `destinationChain`
  - `destinationAddress`
  - `payload`
  - `symbol`
  - `amount`
need to match the arguments of a `contractCallWithToken` on the `AxelarGateway`
- For `payGasForContractCall` and `payGasForContractCallWtihToken`
  - `gasToken` is the address of the token that gas will be payed in. Ensure this token is supported with our API.
  - `gasFeeAmount` is the amount of `gasToken` to trasnfer from the sender. The sender needs to have approved the `AxelarGasReceiver` with the appropriate amound to `gasToken` first.
- For `payNativeGasForContractCall` and `payNativeGasForContractCallWithToken` the amount of funds received is specified by `msg.value`.
- For all functions
  - `refundAddress` is the address that will be able to receive excess amount payed for gas.


## API

To get the relative gas cost in any token on any of the supported chains you can use the following script. This is subject to change.

```ts
const { constants: { AddressZero } } = require('ethers');
const axios = require('axios');

async function getGasPrice(sourceChain, destinationChain, tokenAddress, tokenSymbol) {
    const api_url ='https://devnet.api.gmp.axelarscan.io';

    const requester = axios.create({ baseURL: api_url });
        const params = {
        method: 'getGasPrice',
        destinationChain: destinationChain,
        sourceChain: sourceChain,
    };

    // set gas token address to params
    if (tokenAddress != AddressZero) {
        params.sourceTokenAddress = tokenAddress;
    }
    else {
        params.sourceTokenSymbol = tokenSymbol;
    }
      // send request
    const response = await requester.get('/', { params })
        .catch(error => { return { data: { error } }; });
    const result = response.data.result;
    const dest = result.destination_native_token;
    const destPrice = 1e18 * dest.gas_price * dest.token_price.usd;
    return destPrice / result.source_token.token_price.usd;
}
```


# General Message Passing

With General Message Passing you can:

- Call a contract on chain B from chain A.
- Call a contract on chain B from chain A and attach some tokens.

For GMP to work, both chain A and chain B should have an Axelar Gateway deployed.

To check if a chain has an Axelar Gateway deployed you can refer to [Resources](../resources).

![axelar-gmp.png](/images/axelar-gmp.png)

## Call a contract on chain B from chain A

To call chain B from chain A the user needs to call `callContract` on the gateway of chain A, specifying:

- The destination chain.
- The destination contract address to call.
- The payload to pass to the destination contract.

As per snippet below.

```solidity
function callContract(
    string memory destinationChain,
    string memory contractAddress,
    bytes memory payload
) external;
```

The destination contract must implement the `IAxelarExecutable` interface defined in [IAxelarExecutable.sol](https://github.com/axelarnetwork/axelar-cgp-solidity/blob/main/src/interfaces/IAxelarExecutable.sol).

`IAxelarExecutable` has an `_execute` function that will be triggered by the Axelar network after the `callContract` function has been executed. You can write any custom logic there.

```solidity
function _execute(
    string memory sourceChain,
    string memory sourceAddress,
    bytes calldata payload
) internal virtual {}
```

## Call a contract on chain B from chain A and attach some tokens

To call chain B from chain A and send some tokens along the way, the user needs to call `callContractWithToken` on the gateway of chain A, specifying:

- The destination chain.
- The destination contract address to call.
- The payload to pass to the destination contract.
- The symbol of the token to transfer.
- The amount of the token to transfer.

As per snippet below.

```solidity
function callContractWithToken(
    string memory destinationChain,
    string memory contractAddress,
    bytes memory payload,
    string memory symbol,
    uint256 amount
) external;
```

The destination contract must implement the `IAxelarExecutable` interface defined in [IAxelarExecutable.sol](https://github.com/axelarnetwork/axelar-cgp-solidity/blob/main/src/interfaces/IAxelarExecutable.sol).

`IAxelarExecutable` has an `\_executeWithToken` function that will be triggered by the Axelar network after the `callContractWithToken` function has been executed. You can write any custom logic there.

The destination contract will be authorized to transfer the ERC-20 identified by the `tokenSymbol`.

```solidity
function _executeWithToken(
    string memory sourceChain,
    string memory sourceAddress,
    bytes calldata payload,
    string memory tokenSymbol,
    uint256 amount
) internal virtual {}
```

### Example

Suppose our destination contract wants to forward the token it received to a recipient provided in the payload. It could be done this way.

```solidity
function _executeWithToken(
    string memory sourceChain,
    string memory sourceAddress,
    bytes calldata payload,
    string memory tokenSymbol,
    uint256 amount
) internal virtual {
	// decode recipient
  address memory recipient = abi.decode(payload, (address));
	// get ERC-20 address from gateway
  address tokenAddress = gateway.tokenAddresses(tokenSymbol);

	// transfer received tokens to the recipient
	IERC20(tokenAddress).transfer(recipient, amount);
}
```

### Note regarding the payload

You have probably noticed that the `payload` that is passed to `callContract` (and ultimately to the `_execute` and `_executeWithToken`) are `bytes`. To encode data as `bytes` you can use the ABI encoder/decoder.

Example of payload encoding in JavaScript (using ethers.js):

```jsx
const { ethers } = require("ethers");

// encoding a string
const payload = ethers.utils.defaultAbiCoder.encode(
  ["string"],
  ["Hello from contract A"]
);
```

Example of payload decoding in Solidity:

```solidity
function _execute(
    string memory sourceChain,
    string memory sourceAddress,
    bytes calldata payload
) internal override {
		// decoding a string
    string memory _message = abi.decode(payload, (string));
}
```

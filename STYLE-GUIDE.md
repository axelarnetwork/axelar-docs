# Axelar developer documentation style guide

Thank you for contributing to the Axelar documentation! We aim to provide clear, consistent information on how to build for the interchain future. Please refer to this guide when working on the docs. It will be updated regularly as Axelar grows and new standards come into place.

This style guide is inspired by the [Google developer documentation style guide](https://developers.google.com/style).

## Table of contents

- [Voice and tone](#voice-and-tone)
- [Document structure](#document-structure)
- [Content format](#content-format)

## Voice and tone

- Be friendly, respectful, and not overly pedantic, like you're pair-programming with a friend.
- Refer to [Google's word list](https://developers.google.com/style/word-list) when unsure how to phrase something.

### When addressing the reader

- Address the reader directly by using the second-person "you."
- Do not use the word "I." When speaking on Axelar's behalf, use "we."

| **Recommended**                                                                                | **Not recommended**                                                                                 |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Hardhat and Foundry are local development platforms. Use Remix if you prefer an online editor. | Hardhat and Foundry are local development platforms. I'd use Remix if I preferred an online editor. |
| We recommend using MetaMask for this tutorial.                                                 | I recommend using MetaMask for this tutorial.                                                       |

### When referring to a third party user or developer

- Use the singular "they" when referring to a third party user or developer.

| **Recommended**                                    | **Not recommended**                                     |
| -------------------------------------------------- | ------------------------------------------------------- |
| A user can check their transactions on Axelarscan. | A user can check his or her transactions on Axelarscan. |

### Accessibility

- Use "earlier", "preceding", or "following" to refer to the position of a code snippet or UI element in a document rather than "above," "below," or "left-hand side."

| **Recommended**                                                              | **Not recommended**                                                      |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Start up the Hardhat command-line interface by typing the following command. | Start up the Hardhat command-line interface by typing the command below. |
| Copy the address from the preceding section.                                 | Copy the address from the section above.                                 |

## Document structure

- Avoid a wall of text whenever possible.
- Break a long section up into subsections with the appropriate headings.
- Add screenshots when a UI is not likely to change.

### Code comments

- Comment in the code directly whenever possible.
- Add bullet points directly above or below the code snippet if it makes the code more clear.

**Recommended**

`sendToMany` will need to do the following:

- Get the address of a token from its symbol
- Send funds to another address
- Approve the gateway to spend funds
- Encode the recipient addresses on the destination chain to ensure that they are `byte`s, since GMP messages must be of this type

```solidity
function sendToMany(
  string memory _destChain,
  string memory _destContractAddr,
  address[] calldata _destinationAddrs,
  string memory _symbol,
  uint256 _amount
) external payable {
    // Check that funds have been sent. If no
    // funds have been sent, revert the transaction.
    require(msg.value > 0, "Gas payment required");

    // Use the gateway contract to obtain the address
    // of the ERC-20 token you will be sending from
    // chain A to chain B.
    address tokenAddress = gateway.tokenAddresses(_symbol);

    // Transfer the ERC-20 token from the sender's
    // wallet to this contract.
    IERC20(tokenAddress).transferFrom(msg.sender, address(this), _amount);

    // Grant approval to the gateway contract to
    // transfer funds on this contract's behalf.
    IERC20(tokenAddress).approve(address(gateway), _amount);

    // Encode and send a GMP message along with the
    // token. _destinationAddrs is a list that contains
    // the addresses of the ERC-2O token's final
    // recipients once the transaction has arrived
    // at the destination chain.
    bytes memory recipientAddressesEncoded = abi.encode(_destinationAddrs);

    // Output: a list of addresses in bytes
}
```

**Not recommended**

`sendToMany` will need to get the address of a token from its symbol, send funds to another address, approve the gateway to spend funds, and encode the recipient addresses on the destination chain to ensure that they are `bytes`, since GMP messages must be of this type. It will have a list of `bytes` as output.

```solidity`
function sendToMany(
string memory \_destChain,
string memory \_destContractAddr,
address[] calldata \_destinationAddrs,
string memory \_symbol,
uint256 \_amount
) external payable {

    require(msg.value > 0, "Gas payment required");

    address tokenAddress = gateway.tokenAddresses(_symbol);

    IERC20(tokenAddress).transferFrom(msg.sender, address(this), _amount);

    IERC20(tokenAddress).approve(address(gateway), _amount);

    bytes memory recipientAddressesEncoded = abi.encode(_destinationAddrs);

}

```

### Section headings

* Don't skip heading types. A subheading under a title should be an H1, the nested subheading under that one an H2, and so forth.

### Document titles

* Write in sentence case rather than capitalizing every letter of a new word.

|  **Recommended**  |  **Not recommended** |
| --- | --- |
|  Set up your development environment  |  Set Up Your Development Environment  |

## Content format

* Use bold, italic, and code font when appropriate.
* Product names should not have any special font formatting.

### Bold font

* Use bold font for UX elements.

|  **Recommended**  |  **Not recommended** |
| --- | --- |
|  In MetaMask, go to the **Tokens** tab and click **Import Tokens**.  |  In MetaMask, go to the “Tokens” tab and click “Import Tokens.”  |

### Italic font

* Use italics when using a new concept or term for the first time. Do not italicize more than once.

|  **Recommended**  |  **Not recommended** |
| --- | --- |
|  Axelar's __General Message Passing (GMP)__ enables a developer building on one chain to call any function on any other connected chain.  |  Axelar's **General Message Passing (GMP)** enables a developer building on one chain to call any function on any other connected chain.  |
|  Axelar's __General Message Passing (GMP)__ enables a developer building on one chain to call any function on any other connected chain. For GMP to work, chains A and B must be EVM or Cosmos with a deployed Axelar Gateway contract.   |  Axelar's __General Message Passing (GMP)__ enables a developer building on one chain to call any function on any other connected chain. For __GMP__ to work, chains A and B must be EVM or Cosmos with a deployed Axelar Gateway contract.  |

### Underlined font

* Do not underline anything in the documentation.

### Code font

* Use code font for text input, strings, and any names found in code, such as properties and methods.

|  **Recommended**  |  **Not recommended** |
| --- | --- |
|  If the prepaid gas is insufficient, you might see `NOT ENOUGH GAS` or other messages, such as `Insufficient gas for executing the transaction` and `intrinsic gas too low`.  |  If the prepaid gas is insufficient, you might see __NOT ENOUGH GAS__ or other messages, such as __Insufficient gas for executing the transaction__ and __intrinsic gas too low__.  |
|  `sendToMany()` takes many parameters, including `_destChain` and `_destContractAddr`.  |  **sendToMany()** takes many parameters, including **_destChain** and **_destContractAddr**.  |
|  Give your test wallet an alias, such as `My Sepolia test wallet`.  |  Give your test wallet an alias, such as "My Sepolia test wallet".  |

### Hyperlinks

* Use descriptive hyperlink text rather than the word  "here."

|  **Recommended**  |  **Not recommended** |
| --- | --- |
|  For more information on General Message Passing, check out [Axelar's YouTube channel](https://www.youtube.com/channel/UCf8GFg58fdp1iZwLAOV1Tgg).  |  For more information on General Message Passing, check out Axelar's YouTube channel [here](https://www.youtube.com/channel/UCf8GFg58fdp1iZwLAOV1Tgg).  |

### Lists

* When writing a list, either use complete sentences for all elements or no elements. Either every element has a period at the end, or none of them do. Do not mix and match.

**Recommended**

Implement the following to send an interchain transaction with Axelar:

* `AxelarExecutable` – The contract to handle a message on the destination chain once a transaction has been sent to the Axelar network
* `IAxelarGateway` – The Axelar Gateway
* `IAxelarGasService` – The Axelar Gas Service
* `IERC20` – The ERC-20 token interface to access ERC-20-related functionality

**Not recommended**

Implement the following to send an interchain transaction with Axelar:

* `AxelarExecutable` – This is a contract that handle a message on the destination chain once a transaction has been sent to the Axelar network.
* `IAxelarGateway` – The Axelar Gateway
* `IAxelarGasService` – The Axelar Gas Service
* `IERC20` – This represents the ERC-20 token interface to access ERC-20-related functionality.
```

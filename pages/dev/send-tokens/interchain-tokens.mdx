import { Callout } from 'nextra-theme-docs'

# Interchain Tokens

Axelar has [several ways](overview) to send [supported tokens](/resources/testnet#assets), but what if you want to send another ERC20 and have it be available on multiple chains? Axelar can help with our new Interchain Tokens!

Interchain Tokens allow you to send tokens cross-chain, build your own asset bridges, build asset transfers into your interchain dApp, build chain-agnostic wallets that aggregate user balances of tokens across chains, and take on many other use cases.

Our Interchain Token tools register an existing [ERC-20](https://ethereum.org/developers/docs/standards/tokens/erc-20/) (we'll help you create a new token if you don't have one) and make it available on multiple chains.

<Callout type="warning" emoji="⚠️">
 Interchain Tokens are currently only available on testnets. Stay tuned to be among the first to find out about our mainnet launch.
</Callout>

## Creating an Interchain Token
The first step is to visit the [Interchain Token Portal](https://testnet.services.axelar.dev/). Select the correct source network in your wallet, and then enter the address of an existing ERC20 token, or choose to create a new one. 

If you create a new one, you can choose an initial supply or mint new tokens later.

It's also simple to [use Remix to create your own ERC-20 for testing](https://remix.ethereum.org/axelarnetwork/axelar-docs/blob/main/public/samples/interchain-token-simple.sol).

[Interchain Token Portal Testnet](https://testnet.services.axelar.dev/) (Mainnet coming soon)

Follow the prompts to verify the token address (known as the origin token) or create a new token, and then choose the chains you'd like to deploy your Interchain Token to. Axelar will configure the interchain token linker on the destination chains, and make your ERC20 token available on all destination chains.

Take note in the upper right hand corner of your Token ID, you'll need this when moving your token between blockchains.

## Interacting with your Interchain Token
You can interact with your original token and the Interchain Token on all other chains identically, as they are all ERC-20 tokens. You can send, transfer, approve, and use all of the methods you are used to.

## Transferring Tokens Between Chains using Axelar
Tokens are moved between chains by interacting with the [Token Linker](https://goerli.etherscan.io/address/0x7cd2e96f5258bb825ad6fc0d200edf8c99590d30#readProxyContract) contract. The Token Linker contract is at [0x7cd2e96f5258bb825ad6fc0d200edf8c99590d30](https://goerli.etherscan.io/address/0x7cd2e96f5258bb825ad6fc0d200edf8c99590d30#readProxyContract)) on all EVM chains.

First, approve the spend of your token by the Token Linker, then send your tokens.

```solidity
token.approve(0x7cd2e96f5258bb825ad6fc0d200edf8c99590d30, amount);
```

The primary method you'll want to use on the linker is `sendToken`.

```solidity
linker.sendToken(
	tokenId, // The chain-independent id of your token, from the portal or from `getTokenId`
	destinationChain, // The name of the destination chain
	destinationAddress, // The address to send tokens to on the destination chain
	amount // The amount of tokens to send 
);
```


If you'd like to integrate send functionality into your token, you could save your `tokenId` in your contract and build your own `sendInterchain` method as part of your token.

```solidity
function sendInterchain(string calldata destinationChain, bytes calldata to, uint256 amount) {
	linker = ITokenLinker(0x7cd2e96f5258bb825ad6fc0d200edf8c99590d30);
	approve(address(portal), amount);
	linker.sendToken(tokenId, destinationChain, destinationAddress, amount);
}
```

Check our our sample of an [ERC-20 with its own send functionality](https://remix.ethereum.org/axelarnetwork/axelar-docs/blob/main/public/samples/interchain-token-integrated-send.sol).
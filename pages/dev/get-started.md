# Get started

import Button from '../../components/button'

## Summary: Develop a cross-chain dApp in 2 simple steps

The ideal development process is completed in two steps: 

1. Build. Develop your dApp and test it against the Axelar local development environment.
2. Deploy. Deploy your contracts and point your dApp to a live network: testnet or mainnet.

**_To begin, download the Axelar dApp starter kit._**

A full-stack template with contracts and UI that can be run in the Axelar local development environment. The starter kit README contains step-by-step directions on building your app from the ground up.

<Button title="Axelar DApp Starter Kit" url="https://github.com/axelarnetwork/axelar-dapp-starter-kit" />

## Components
Build a cross-chain dApp in the local development environment using two basic components:

1. RPC endpoints to query or post transactions to the various EVM chains supported by Axelar.
2. Contract addresses on various EVM chains for:
    - Axelar services such as the Gateway contract and ERC-20 token contracts.
    - Your own custom `IAxelarExecutable` smart contracts.

The Axelar local development environment simulates multiple EVM chains and the Axelar overlay network that connects them. The _Axelar dApp starter kit_ allows you to develop your dApp and test it against the Axelar local development environment.

## Build

The Axelar local development environment allows you to:

1. Create simulated EVM chains with RPC endpoints on your localhost. These chains come pre-loaded with the AxelarGateway, AxelarGasReceiver and a routed ERC-20 token contract (axlUSDC).
2. Deploy your custom `IAxelarExecutable` contracts to your simulated EVM chains.
3. Test your app against the RPC endoints and contract addresses of your local development environment.

## Deploy

When you're ready to go live to testnet or mainnet: 

1. Deploy your custom `IAxelarExecutable`contracts to the live EVM chains (testnet or mainnet) your dApp supports. 
2. Swap out the RPC endpoints and contract addresses so they now point to live EVM chains (testnet or mainnet).

## Examples

### Examples repo

Prefer to build from examples? We have a full library below for you to choose from.

View the README in the `axelar-local-gmp-examples` repo. It provides instructions and code for several application examples.

<Button title="Examples" url="https://github.com/axelarnetwork/axelar-local-gmp-examples" />

[//]: # (Suggest we put this on one of the GMP pages, and also create a page that lists all videos, once we have more than 2.)

### Video on NFT linker example

The [axelar-local-gmp-examples](https://github.com/axelarnetwork/axelar-local-gmp-examples) repo contains an example [nft-linker](https://github.com/axelarnetwork/axelar-local-gmp-examples/tree/main/examples/nft-linker) on cross-chain transfer for ERC-721 NFT tokens.

See the accompanying [video](https://www.youtube.com/watch?v=pAxuQ7PIl8g):

<iframe width="560" height="315" src="https://www.youtube.com/embed/pAxuQ7PIl8g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

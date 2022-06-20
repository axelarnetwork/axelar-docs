# Get started

import Button from '../../components/button'

## Develop your cross-chain dapp in three simple steps

#### 1. **_Download our starter kit._** 

<Button title="Axelar DApp Starter Kit" url="https://github.com/axelarnetwork/axelar-dapp-starter-kit" />

A fullstack template with contracts and UI that can be run in our local dev environment. The starter kit readme contains step-by-step directions on building your app from the ground up.


#### 2. **_Build._** 

Your cross-chain dapp is built from these basic components:

- **Contract addresses** on various EVM chains for
  - Axelar services such as the Gateway contract and ERC-20 token contracts.
  - Your own custom `IAxelarExecutable` smart contracts.
- **RPC endpoints** to query or post transactions to the various EVM chains supported by Axelar.

The _Axelar local development environment_ emulates multiple EVM chains and the Axelar overlay network that connects them, and the _Axelar DApp Starter Kit_ allows you to develop your dapp and test against the Axelar local development environment seamlessly. It:
1. Creates a simulation of EVM chains with RPC endpoints on your localhost. These chains come pre-loaded with the AxelarGateway, AxelarGasReceiver and a routed ERC-20 token contract (aUSDC).
2. Deploy your custom `IAxelarExecutable` contracts to your emulated EVM chains.
3. Test your app against the RPC endoints and contract addresses of your local development environment.

#### 3. **_Deploy._** 

When you're ready to go live:

- Deploy your custom `IAxelarExecutable` contracts to the live EVM chains your dapp supports.
- Swap out the RPC endpoints and contract addresses so they now point to live EVM chains.

### Video walkthrough (TBD)

Prefer a video walkthrough? Follow along our (short) video series walking through our starter kit:
1. axelar-local-dev env set up. (links TBD)
2. deploying those contracts in the airdrop example to two parallel local network. (links TBD)
3. frontend that invokes source chain contract in JS. will maybe include explainers for gas receiver, etc. (links TBD)
4. deploying those contracts to testnet. (links TBD)
5. then updating frontend to point to testnet contracts, running the example, and then where to view status on testnet.axelarscan (links TBD)


## Examples

### Examples repo

Prefer to build from examples? We have a full library below for you to choose from.

View the github README in the `axelar-local-gmp-examples` repo for instructions and code for several application examples:

<Button title="Examples" url="https://github.com/axelarnetwork/axelar-local-gmp-examples" />

### Video on NFT linker example

The [axelar-local-gmp-examples](https://github.com/axelarnetwork/axelar-local-gmp-examples) repo contains an example [nft-linker](https://github.com/axelarnetwork/axelar-local-gmp-examples/tree/main/examples/nft-linker) on cross-chain transfer for ERC-721 NFT tokens.

See the accompanying [video](https://www.youtube.com/watch?v=pAxuQ7PIl8g):

<iframe width="560" height="315" src="https://www.youtube.com/embed/pAxuQ7PIl8g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
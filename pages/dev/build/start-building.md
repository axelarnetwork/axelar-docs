import DevNav from '../../../components/index/dev-nav'

# Start building on Axelar

Developer tools allow you to build on the right platform for your use case so your dApp can access users, assets, and applications across all Axelar-connected ecosystems. 

As a dApp developer, you can leverage the Axelar application-development layer for cross-chain communication and focus on building the functionality that differentiates your dApp.

## Local development environment

By building the (Hello World)[./hello-world] dApp, you already configured your local development environment.

## Cross-chain functions

Build your dApp to support the basic cross-chain functions:

- Transfer tokens

- Send messages using [General Message Passing (GMP)](./gmp-overview)

### Transfer tokens

To transfer tokens, choose the cross-chain token transfer path that is appropriate for your use case.

- [sendToken](tokens.md#call-sendtoken)

    Use the `sendToken` on-chain Solidity method to transfer tokens on an Axelar gateway EVM contract when your dApp:

  - Transfers tokens between EVM-to-EVM or EVM-to-Cosmos

  - Uses smart contracts

- [Deposit address](../axelarjs-sdk/token-transfer-dep-addr.md#5-generate-a-deposit-address)

    Use the AxelarJS SDK to generate a deposit address on a source chain to receive tokens on that chain when your dApp:

  - Transfers tokens between EVM and ecosystems other than EVM or Cosmos

  - Transfers tokens from wallets or exchanges that do not support Axelar. For example, withdraw from a centralized exchange.

### Send messages using GMP

Send a cross-chain message to call any function on any other connected chain. Send a message using the GMP contract call that is appropriate for your use case.

- [callContract](./gmp-messages.md)

  Use the `callContract` function to call a contract on chain B from chain A.

- [callContractWithToken](./gmp-tokens-with-messages.md)

  Use the `callContractWithToken` function to call a contract on chain B from chain A and attach tokens.

## Helpful resources

- View Axelar network status and cross-chain activities on the (Axelarscan)[https://www.axelarscan.io/] cross-chain block explorer.

- (How General Message Passing (GMP) works)[https://axelar.network/blog/general-message-passing-and-how-can-it-change-web3]

Use the suite of tools and kick-starter examples in the Axelar developer ecosystem:

<br/>
<DevNav />
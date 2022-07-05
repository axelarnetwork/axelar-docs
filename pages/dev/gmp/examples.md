import Button from '../../../components/button'

#  Example cross-chain dApps using GMP

The `axelar-local-gmp-examples` repo has an array of "kick-starter" examples to show the ease of integrating Axelar's GMP protocol into any dApp to bring it cross-chain. 

A variety of use cases are included in these examples, ranging from a simple "Hello World" example to more advanced usages like an NFT auctionhouse, two-way communication, etc. Ultimately, every example is built on either of the two fundamental building blocks for GMP:
- `callContract`, or
- `callContractWithToken`

<Button title="View the repo" url="https://github.com/axelarnetwork/axelar-local-gmp-examples" />


Each example is self-contained and generally follows the same steps for deployment and testing:
1. (One time setup): Install project dependencies and build contracts: [One time setup instructions](https://github.com/axelarnetwork/axelar-local-gmp-examples#one-time-setup)
2. (One time setup): From a separate terminal window, deploy and run the local network emulator: 
    - `node scripts/createLocal`
3. Then, deploy and test each example, first locally and then in testnet. Each example has deploy/test scripts that are invoked via CLI and take command line arguments that are specific to that example but generally follow this signature:
```bash
node scripts/[deploy|test] examples/[examples-directory-name] [local|testnet] ${"source-chain"} ${"destination-chain"} ...other args
```

A subset of five representative examples below:

### Example 1: "Hello World!"

- Description: Relay a message ("Hello World!") from a source chain to a destination chain and update the `_value` state of that destination chain to that message.
- Building Block: `callContract`
- Deploy/Run instructions: https://github.com/axelarnetwork/axelar-local-gmp-examples#call-contract
- Source Code: https://github.com/axelarnetwork/axelar-local-gmp-examples/tree/main/examples/call-contract
- Sample code to deploy/run locally via CLI:
```bash
node scripts/deploy examples/call-contract local
node scripts/test examples/call-contract local "Moonbeam" "Avalanche" 'Hello World'
```

### Example 2: Airdrop

- Description: Send aUSDC from a source chain to destination chain and distribute it equally among all accounts specified.
- Building Block: `callContractWithToken`
- Deploy/Run instructions: https://github.com/axelarnetwork/axelar-local-gmp-examples#call-contract-with-token
- Source Code: https://github.com/axelarnetwork/axelar-local-gmp-examples/tree/main/examples/call-contract-with-token
- Sample code to deploy/run locally via CLI:
```bash
node scripts/deploy examples/call-contract-with-token local
node scripts/test examples/call-contract-with-token local "Moonbeam" "Ethereum" 100 0xB8Cd93C83A974649D76B1c19f311f639e62272BC 0x74Ccd7d9F1F40417C6F7fD1151429a2c44c34e6d
```

### Example 3: NFT Linker

- Description: Send an ERC721 NFT originally minted on one chain to a destination chain.
- Building Block: `callContract`
- Deploy/Run instructions: https://github.com/axelarnetwork/axelar-local-gmp-examples#nft-linker
- Source Code: https://github.com/axelarnetwork/axelar-local-gmp-examples/tree/main/examples/nft-linker
- Sample code to deploy/run locally via CLI:
```bash
node scripts/deploy examples/nft-linker local
node scripts/test examples/nft-linker local "Avalanche" "Polygon"
```

### Example 4: Nonced execution

- Description: A way of implementing ordered execution with nonces for messages that are sent cross chain.
- Building Block: `callContract` and `callContractWithToken` (both examples included)
- Deploy/Run instructions: https://github.com/axelarnetwork/axelar-local-gmp-examples#nonced-execution
- Source Code: https://github.com/axelarnetwork/axelar-local-gmp-examples/tree/main/examples/nonced-execution
- Sample code to deploy/run locally via CLI:
```bash
node scripts/deploy examples/nonced-execution local
node scripts/test examples/nonced-execution local ${} ${} ${}
```

### Example 5: Two-way Example - Send Ack

- Description: Two-way example where a message is sent from a source chain to a destination chain and an acknowledgement is sent back to the source chain from the destination chain.
- Building Block: `callContract`
- Deploy/Run instructions: https://github.com/axelarnetwork/axelar-local-gmp-examples#send-ack
- Source Code: https://github.com/axelarnetwork/axelar-local-gmp-examples/tree/main/examples/send-ack
- Sample code to deploy/run locally via CLI:
```bash
node scripts/deploy examples/send-ack local
node scripts/test examples/send-ack local "Fantom" "Moonbeam" 'Received'
```
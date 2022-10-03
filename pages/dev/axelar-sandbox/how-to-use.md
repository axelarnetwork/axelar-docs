# Getting Familiar with Sandbox UI

The Axelar Sandbox UI is divided into four panels.

**Solidity editor (top left) —** Write your Solidity smart contract code here. Several contracts can be written in a single file. They will all be compiled and accessible via JavaScript.

**JavaScript editor (top right)** — Write the JavaScript code that deploys and interacts with the smart contracts.

**JavaScript console output (bottom right) —** This is where you'll see the output of the JavaScript execution as well as any errors that occurred.

**Transactions overview (bottom left)** — a list of transactions that occurred as a result of your Solidity and JavaScript code, including with transaction data such as event logs, function calls, and function arguments

## How to use it?

Let's begin by executing our examples. So, here's how the website looks:

![Guide-1](/images/sandbox-guide-1.png)

1. We have some built-in sample code at the bottom left that the developer can play with without modifying anything.

![Guide-2](/images/sandbox-guide-2.png)

2. `hello-world` is the default example, and it shows how to update destination contract states from the source chain contract. We can test against a testnet or a simulated environment.

![Guide-3](/images/sandbox-guide-3.png)

3. To execute the example, click the **Execute** button in the upper right corner.

![Guide-4](/images/sandbox-guide-4.png)

4. The application will compile the solidity code; if it is successful, the javascript file will be executed; otherwise, the error message will be displayed. The "Output" panel displays all Javascript logs that have already been run.

![Guide-5](/images/sandbox-guide-5.png)

5. The "**Transactions**" panel displays all transaction information transmitted from the "**sender**" wallet, and the "**relayer**" wallet. The relayer wallet is the wallet that interacts with your destination contract. The transaction information is including:

- `Transaction hash`
- `Transaction status`
- `Source address`
- `Destination address`
- `Function name`
- `Function arguments`
- `Emitted event data`

The image below shows how it looks like.

![Guide-6](/images/sandbox-guide-6.png)

## Using Javascript to interact with smart contracts

You can use [ethers.js](https://github.com/ethers-io/ethers.js/) to deploy and interact with your smart contracts using Javascript. The Sandbox by default includes the Ethers.js library, which can be instantiated as `ethers`.

**Available JavaScript global variables**

You can use the global variables listed below anywhere in your JavaScript code.

- **Chain** - the name of supported chains in enum.

```jsx
// all supported chains are below
Chain.ETHEREUM, Chain.AVALANCHE, Chain.FANTOM, Chain.MOONBEAM, Chain.POLYGON;
```

- **$chains** - a global variable of chains info including `rpcUrl`, `gateway`, `gasReceiver`, `tokens.aUSDC`

```jsx
// access to ethereum rpc url endpoint.
$chains[Chain.ETHEREUM].rpcUrl;
// access to avalanche gateway contract address.
$chains[Chain.AVALANCHE].gateway;
// access to fantom gas receiver contract address.
$chains[Chain.FANTOM].gasReceiver;
// access to moonbeam aUSDC token address
$chains[Chain.MOONBEAM].tokens.aUSDC;
```

- **$contracts** - A global variable that provides access to a map of JSON objects representing compiled contracts including `abi` and `bytecode`. The map is indexed by the names of the smart contracts defined in the Solidity file.

```jsx
// access to MessageSender contract's abi
$contracts["MessagerSender"].abi;
// access to MessageReceiver contract's bytecode
$contracts["MessageReceiver"].bytecode;
```

- $**getSigner** - A global function that provides a signer account for given chain.

```jsx
const ethereumSigner = await $getSigner(Chain.ETHEREUM);
const avalancheSigner = await $getSigner(Chain.AVALANCHE);
```

## Deploy a Contract

The following code is the example of how to deploy a smart contract that we wrote in “**MessageSender.sol**” file.

```jsx
const signer = await $getSigner(Chain.MOONBEAM);
const contractFactory = new ethers.ContractFactory(
  $contracts["MessageSender"].abi,
  $contracts["MessageSender"].bytecode,
  srcSigner
);
const contract = await srcContractFactory.deploy(
  $chains.moonbeam.gateway,
  $chains.moonbeam.gasReceiver
);
```

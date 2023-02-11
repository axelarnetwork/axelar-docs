# "Hello World" example dApp

What better way to start than to lead by example? And a simple one we're all familiar with: "Hello World!"

## One-time setup

Install [nodejs](https://nodejs.org/en/download/). Run `node -v` to check your installation.

Version 16 is required. If needed, you can switch your node version via

```bash
sudo npm i -g n
sudo n v16.15.0
```

Clone this repo:

```bash
git clone https://github.com/axelarnetwork/axelar-examples.git
```

Build contracts and tests:

```bash
cd axelar-examples
npm ci
npm run build
```

## Set up deployer key

```bash
cp .env.example .env
```

Then update to your own private key.

## Deploy and run "Hello World"

In order to run the examples against the local emulator, cd to the root directory (`axelar-examples`) in a separate terminal window and run:
```bash
node scripts/start
```
Leave this terminal open for the duration of the example.

Run the "Call Contract" example. The application sends a message - "Hello World" - from a source to a destination chain using the `callContract` function.

#### 1. Deploy locally

To deploy the contract, use the following command:

```bash
npm run deploy evm/call-contract [local|testnet]
```

For example:

```bash
node run deploy evm/call-contract local
```

Output:
```
Deploying ExecutableSample for Moonbeam.
Deploying ExecutableSample for Avalanche.
Deploying ExecutableSample for Fantom.
Deploying ExecutableSample for Ethereum.
Deploying ExecutableSample for Polygon.
Deployed ExecutableSample for Ethereum at 0x775C53cd1F4c36ac74Cb4Aa1a3CA1508e9C4Bd24.
Deployed ExecutableSample for Moonbeam at 0xF8f92930AD2C4d627a96819E67aD3BcD95b5E063.
Deployed ExecutableSample for Polygon at 0x775C53cd1F4c36ac74Cb4Aa1a3CA1508e9C4Bd24.
Deployed ExecutableSample for Avalanche at 0x775C53cd1F4c36ac74Cb4Aa1a3CA1508e9C4Bd24.
Deployed ExecutableSample for Fantom at 0x775C53cd1F4c36ac74Cb4Aa1a3CA1508e9C4Bd24.
```

#### 2. Run locally

To execute the example, use the following command:

```bash
npm run execute evm/call-contract [local|testnet] ${srcChain} ${destChain} ${message}
```

For example:
```bash
npm run execute evm/call-contract local "Moonbeam" "Avalanche" "Hello World"
```

Output:

```
--- Initially ---
value at Avalanche is
--- After ---
value at Avalanche is Hello World
```

#### 3. Run in testnet

When you're ready, you can take the actual local example above and change the `local` environment parameters in the deploy/run scripts to `testnet`.

That's it!

## Summary

In the above, we sent a message - "Hello World" - from a smart contract on Moonbeam to a smart contract on Avalanche, updating the latter's "value" property to our "Hello World" message.

The full transaction flow was:
1. Started the local developer environment to run local EVM blockchains.
2. The first node script deployed [this](https://github.com/axelarnetwork/axelar-examples/blob/main/examples/evm/call-contract/ExecutableSample.sol) smart contract to all the EVM chains in our local developer environment.
3. The second node script ran [this](https://github.com/axelarnetwork/axelar-examples/blob/main/examples/evm/call-contract/index.js#L22) test script on local Moonbeam, which:
    - Calculated the estimated gas cost of executing the method on Avalanche.
    - Invoked `setRemoteValue` on the deployed Moonbeam smart contract. This method first pays the gas receiver on Moonbeam the estimated gas cost, then calls `callContractWithToken` on the Moonbeam Gateway contract.
4. After some time, the relay services detect the gas paid on Moonbeam and executes the smart contract on Avalanche, invoking the `_execute` method that updated the value to the message parameter.

## Ready to [build](./build/getting-started)?
## Want to learn more about [General Message Passing](./gmp-overview)?

# Mainnet

import MarkdownPath from '../../components/markdown'
import EVMChains from '../../components/evm/chains'
import EVMAssets from '../../components/evm/assets'
import IBCChannels from '../../components/ibc/channels'

| Variable              | Value     |
| --------------------- | --------- |
| `axelar-core` version | `v0.17.1` |
| `vald` version        | `v0.17.0` |
| `tofnd` version       | `v0.10.1`  |

<div className="space-y-1 mt-4">
  ## EVM Chains
  <EVMChains environment="mainnet" />
</div>

<div className="space-y-1 mt-4">
  ## Assets
  <EVMAssets environment="mainnet" />
</div>

<div className="space-y-1 mt-4">
  ## IBC Channels
  <IBCChannels environment="mainnet" />
</div>

## Cross-chain transfer fee

The Network (and thus the Satellite app) charges a base fee for all cross-chain transfers.
This fee only depends on the source/destination chain and the asset and does NOT take a percentage from the transfer amount.
When transferring an asset X from chain Y to chain Z, the transfer fee is the sum of per-chain fee for that asset.
For e.g. a transfer of 1000 UST from Terra to Avalanche will have a fee of 1.5 UST (= 0.5 UST for Terra + 1.0 UST for Avalanche), and so the recipient will get 998.5 UST.

| Asset symbol | Ethereum  | non-Ethereum EVM | Cosmos Chains | Decimals | Unit     |
| ------------ | --------- | ---------------- | ------------- | -------- | -------- |
| UST          | 20 UST    | 1 UST            | 0.5 UST       | 6        | uusd     |
| LUNA         | 0.2 LUNA  | 0.01 LUNA        | 0.005 LUNA    | 6        | uluna    |
| ATOM         | 0.7 ATOM  | 0.04 ATOM        | 0.02 ATOM     | 6        | uatom    |
| USDC         | 20 USDC   | 1 USDC           | 0.5 USDC      | 6        | uusdc    |
| FRAX         | 20 FRAX   | 1 FRAX           | 0.5 FRAX      | 18       | frax-wei |
| DAI          | 20 DAI    | 1 DAI            | 0.5 DAI       | 18       | dai-wei  |
| USDT         | 20 USDT   | 1 USDT           | 0.5 USDT      | 6        | uusdt    |
| NGM          | 16 NGM    | 0.8 NGM          | 0.4 NGM       | 6        | ungm     |
| EEUR         | 20 EEUR   | 1 EEUR           | 0.5 EEUR      | 6        | eeur     |
| WETH         | 0.01 WETH | N/A              | 0.0002 WETH   | 18       | weth-wei |

The current transfer fee can also be queried on the network with

```bash
axelard q nexus transfer-fee [source chain] [destination chain] [amount]
```

For e.g., querying the example transfer above (note `1 UST = 10^6 uusd`),

```bash
axelard q nexus transfer-fee terra avalanche 1000000000uusd
```

The per-chain fee info can be queried via

```bash
axelard q nexus fee avalanche uusd
```

If the total amount of asset X sent to a deposit address A is NOT greater than the transfer fee,
then those deposits will sit in the queue until a future deposit to A brings the total above the fee.

Additionally, users should be prepared to pay for any transaction fees assessed by the source chain when transferring funds into a deposit address.
These fees are typically in the form of native tokens on that chain (for e.g. LUNA on Terra, ETH on Ethereum).

## Upgrade Path

<MarkdownPath src="/md/mainnet/upgrade-path.md" />

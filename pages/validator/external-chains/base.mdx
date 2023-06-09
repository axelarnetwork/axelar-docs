# Base

import Markdown from 'markdown-to-jsx'
import { Callout } from 'nextra-theme-docs'
import CodeBlock from '../../../components/code-block'
import { Tabs, Tab } from 'nextra-theme-docs'

Instructions to set up your Base (Coinbase L2) node.

<Callout type="info" emoji="ℹ️">
  Note: Mainnet for base is not available yet. Instructions will be added after launch.
</Callout>

## Requirements

- [Setup your Axelar validator](/validator/setup)
- Minimum hardware requirements: 16GB RAM, 100GB+ free storage space.
- MacOS or Ubuntu 20.04 (tested on 20.04)
- [Official Documentation](https://docs.base.org/guides/run-a-base-goerli-node)


## Prerequisites

```bash
sudo apt-get install jq -y
snap install docker

```

## Configure and start node

1. Clone the Base repo

```bash
git clone https://github.com/base-org/node
```

2. In `docker-compose.yml`, set `OP_NODE_L1_ETH_RPC` to your own Goerli L1 RPC node. Using your own Goerli node is required to guarantee decentralization for validation.

3. Run:

```bash
docker compose up
```

4. You should now be able to `curl` your Base node:

```bash
curl -d '{"id":0,"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false]}' \
  -H "Content-Type: application/json" http://localhost:8545
```

Sync speed depends on your L1 node, as the majority of the chain is derived from data submitted to the L1. You can check your syncing status using the `optimism_syncStatus` RPC on the `op-node` container. Example:

```bash
echo Latest synced block behind by: \
$((($( date +%s )-\
$( curl -d '{"id":0,"jsonrpc":"2.0","method":"optimism_syncStatus"}' -H "Content-Type: application/json" http://localhost:7545 |
   jq -r .result.unsafe_l2.timestamp))/60)) minutes
```

You can check the latest block against the [explorer](https://goerli.basescan.org/).

Since Base uses the Optimism stack, you can review the [Optimism Instructions](/validator/external-chains/optimism) for more details on expected log output and helpful rpc queries.

### Configure vald

In order for `vald` to connect to your Base node, your Base RPC should be exposed in
vald's `config.toml`


<Tabs items={['Testnet']}>
  <Tab>
  ```bash
  [[axelar_bridge_evm]]

  name = "base"
  rpc_addr = "http://IP:PORT"
  start-with-bridge = true
  ```
  </Tab>
</Tabs>
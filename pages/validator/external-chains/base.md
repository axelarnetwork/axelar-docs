# Base

import Markdown from 'markdown-to-jsx'
import Tabs from '../../../components/tabs'
import CodeBlock from '../../../components/code-block'
import { NextraTab, NextraTabs } from 'nextra-theme-docs'
import Callout from 'nextra-theme-docs/callout'

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

1. Ensure you have an Goerli L1 node RPC available, and set `OP_NODE_L1_ETH_RPC` (in `docker-compose.yml` if using docker-compose).
2. Run:
```
docker compose up
```
3. You should now be able to `curl` your Base node:
```
curl -d '{"id":0,"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false]}' \
  -H "Content-Type: application/json" http://localhost:8545
```

Sync speed depends on your L1 node, as the majority of the chain is derived from data submitted to the L1. You can check your syncing status using the `optimism_syncStatus` RPC on the `op-node` container. Example:
```
echo Latest synced block behind by: \
$((($( date +%s )-\
$( curl -d '{"id":0,"jsonrpc":"2.0","method":"optimism_syncStatus"}' -H "Content-Type: application/json" http://localhost:7545 |
   jq -r .result.unsafe_l2.timestamp))/60)) minutes
```

Since Base uses the Optimism stack, you can review the [Optimism Instructions](/validator/external-chains/optimism) for more details on expected log output and helpful rpc queries.

# Optimism

import Markdown from 'markdown-to-jsx'
import Tabs from '../../../components/tabs'
import CodeBlock from '../../../components/code-block'
import { NextraTab, NextraTabs } from 'nextra-theme-docs'
import Callout from 'nextra-theme-docs/callout'

Instructions to set up your Optimism node.

<Callout type="info" emoji="ℹ️">
  Note: Mainnet instructions here will only work after the bedrock upgrade is live on mainnet
</Callout>

## Requirements

- [Setup your Axelar validator](/validator/setup)
- Minimum hardware requirements: 8 AWS vCPU+, 16GB RAM, 80GB+ free storage space.
- MacOS or Ubuntu 20.04 (tested on 20.04)
- [Official Documentation](https://community.optimism.io/docs/developers/bedrock/node-operator-guide/#)

## Prerequisites

```bash
sudo apt-get install jq -y
snap install docker 
```

## Clone Repo

```bash
git clone https://github.com/smartcontracts/simple-optimism-node.git
cd simple-optimism-node
cp .env.example .env
```

## Set node config

Set the following config options in `simple-optimism-node/.env`:
<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="bash">
{`NETWORK_NAME=mainnet
NODE_TYPE=full
BEDROCK_SOURCE=download
# Your Ethereum RPC node endpoint. As an L2, your Optimism node will verify tx finality by
# querying your own Ethereum RPC node.
OP_NODE__RPC_ENDPOINT=
OP_NODE__RPC_TYPE=basic`}
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="bash">
{`# only goerli is supported for now
NETWORK_NAME=goerli
NODE_TYPE=full
BEDROCK_SOURCE=download
# Your Ethereum RPC node endpoint. As an L2, your Optimism node will verify tx finality by
# querying your own Ethereum RPC node.
OP_NODE__RPC_ENDPOINT=
OP_NODE__RPC_TYPE=basic`}
</CodeBlock>
}
]} />

## Start the node
```bash
docker compose up -d
```

This should show an output like this:
```bash
   ⠿ b08a0a826235 Pull complete                                                                                                                             90.5s
   ⠦ d71d159599c3 Downloading [>                                                  ]  6.232kB/487.2kB                                                        91.6s
   ⠦ 5cfc4241bcf3 Waiting                                                                                                                                   91.6s
   ⠦ 323993d60cf3 Waiting                                                                                                                                   91.6s
   ⠦ 5149b9087ec2 Waiting                                                                                                                                   91.6s                                                                                                                             91.6s
   ⠦ 209878a685e3 Waiting                                                                                                                                   91.6s
 ⠼ fault-detector Pulling                                                                                                                                   97.4s
```

After it is done, verify by listing the services and their status
```bash
docker compose ps
```

You should see these 4 services running
```bash
NAME                              COMMAND                  SERVICE             STATUS              PORTS
simple-optimism-node-influxdb-1   "/entrypoint.sh infl…"   influxdb            running             0.0.0.0:8086->8086/tcp, :::8086->8086/tcp
simple-optimism-node-op-geth-1    "/bin/sh -c '/script…"   op-geth             running             0.0.0.0:9991-9992->8545-8546/tcp, :::9991-9992->8545-8546/tcp
simple-optimism-node-op-node-1    "/bin/sh -c '/script…"   op-node             running             
simple-optimism-node-torrent-1    "/init"                  torrent             running             0.0.0.0:6881->6881/tcp, 0.0.0.0:6881->6881/udp, :::6881->6881/tcp, :::6881->6881/udp
```

## Check logs

#### Verify op-geth logs

```bash
docker compose logs op-geth -f
```

It will download the bedrock.tar
```bash
simple-optimism-node-op-geth-1  | Still downloading bedrock.tar...
simple-optimism-node-op-geth-1  | + CHECKSUM=df843fd53ea905808bc21d0e2dd4620a
simple-optimism-node-op-geth-1  | + '[' df843fd53ea905808bc21d0e2dd4620a '==' 4a6919d95d719668a493554771f55e9f ]
simple-optimism-node-op-geth-1  | + return 1
simple-optimism-node-op-geth-1  | + return 1
simple-optimism-node-op-geth-1  | + echo 'Still downloading bedrock.tar...'
simple-optimism-node-op-geth-1  | + sleep 5s
```
Once download the server will start, and you will see logs like

```bash
simple-optimism-node-op-geth-1  | INFO [01-22|07:28:21.089] Imported new potential chain segment     number=4,066,054 hash=fe6131..8bfd42 blocks=1         txs=1         mgas=0.000 elapsed="723.105µs" mgasps=0.000   age=1w2d9h  dirty=832.58KiB
simple-optimism-node-op-geth-1  | INFO [01-22|07:28:21.090] Chain head was updated                   number=4,066,054 hash=fe6131..8bfd42 root=74b0c0..f0c70a elapsed="83.46µs"   age=1w2d9h
simple-optimism-node-op-geth-1  | INFO [01-22|07:28:21.094] Imported new potential chain segment     number=4,066,055 hash=8d8383..53fdcb blocks=1         txs=1         mgas=0.000 elapsed="889.945µs" mgasps=0.000   age=1w2d9h  dirty=832.58KiB
simple-optimism-node-op-geth-1  | INFO [01-22|07:28:21.095] Chain head was updated                   number=4,066,055 hash=8d8383..53fdcb root=0929e1..088f55 elapsed="96.886µ
```

#### Verify op-node logs

```bash
docker compose logs op-node -f
```
You should see logs like

```bash
simple-optimism-node-op-node-1  | INFO [01-22|07:50:13.454] Sync progress                            reason="processed safe block derived from L1" l2_finalized=0f7835..05175f:4061224 l2_safe=642c13..1c1e60:4068133 l2_unsafe=642c13..1c1e60:4068133 l2_time=1,673,564,334 l1_derived=f04e19..57a277:8301109
simple-optimism-node-op-node-1  | INFO [01-22|07:50:13.456] generated attributes in payload queue    txs=1  timestamp=1,673,564,336
simple-optimism-node-op-node-1  | INFO [01-22|07:50:13.461] inserted block                           hash=50fbcd..051d3f number=4,068,134 state_root=9c515d..28b2da timestamp=1,673,564,336 parent=642c13..1c1e60 prev_randao=1a282e..c4fcb4 fee_recipient=0x4200000000000000000000000000000000000011 txs=1  update_safe=true
simple-optimism-node-op-node-1  | INFO [01-22|07:50:13.461] Sync progress                            reason="processed safe block derived from L1" l2_finalized=0f7835..05175f:4061224 l2_safe=50fbcd..051d3f:4068134 l2_unsafe=50fbcd..051d3f:4068134 l2_time=1,673,564,336 l1_derived=f04e19..57a277:8301109
simple-optimism-node-op-node-1  | INFO [01-22|07:50:13.462] generated attributes in payload queue    txs=1  timestamp=1,673,564,338
simple-optimism-node-op-node-1  | INFO [01-22|07:50:13.466] inserted block                           hash=3cca62..2a6f53 number=4,068,135 state_root=f4245e..d3f772 timestamp=1,673,564,338 parent=50fbcd..051d3f prev_randao=1a282e..c4fcb4 fee_recipient=0x4200000000000000000000000000000000000011 txs=1  update_safe=true
simple-optimism-node-op-node-1  | INFO [01-22|07:50:13.466] Sync progress                            reason="processed safe block derived from L1" l2_finalized=0f7835..05175f:4061224 l2_safe=3cca62..2a6f53:4068135 l2_unsafe=3cca62..2a6f53:4068135 l2_time=1,673,564,338 l1_derived=f04e19..57a277:8301109
simple-optimism-node-op-node-1  | INFO [01-22|07:50:14.332] Received signed execution payload from p2p id=15c90f..5c92ac:4472873 peer=16Uiu2HAm4hA3Jd2hPnstG3yBUvLULV9dVZgtxmD23iH3wP2ZfYHN
```

## Verify node sync status

#### Method 1:
```bash
curl -X POST $(curl -4 ifconfig.co):9991 -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' | jq
```

If you get something like this in response to the above rpc call, your node is setup correctly
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x3df827"
}
```
You can use a [hex to number convertor](https://www.binaryhexconverter.com/hex-to-decimal-converter) to get the block height

#### Method 2:
You can also check your status by connecting to geth console

```bash
docker exec -it simple-optimism-node-op-geth-1 geth attach http://localhost:8545
> eth.blockNumber
20000000 # it will show you the latest block - number here is just an example
```

You can compare the block height on your node with explorer ([mainnet](https://optimistic.etherscan.io) or [testnet](https://goerli-optimism.etherscan.io)),
use your RPC node only when it has caught up with the latest block height.

## RPC Endpoint

```bash
echo "$(curl -4 ifconfig.co):9991"
```

### Configure vald

In order for `vald` to connect to your Optimism node, your `rpc_addr` should be exposed in
vald's `config.toml`
<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="yaml">
{`[[axelar_bridge_evm]]
name = "optimism"
rpc_addr = "http://IP:PORT"
start-with-bridge = true`}
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="yaml">
{`[[axelar_bridge_evm]]
name = "optimism"
rpc_addr = "http://IP:PORT"
start-with-bridge = true`}
</CodeBlock>
}
]} />

## Common Node Operations

First `cd` into the directory
```bash
cd $HOME/simple-optimism-node/
```

To start
```bash
docker compose up -d
```

To stop
```bash
docker compose down
```

To update
```bash
docker compose pull
```

To stop and wipe out everything
```bash
docker compose down -v
```

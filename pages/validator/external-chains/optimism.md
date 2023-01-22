# Optimism
-----------

import Markdown from 'markdown-to-jsx'
import Tabs from '../../../components/tabs'
import CodeBlock from '../../../components/code-block'
import { NextraTab, NextraTabs } from 'nextra-theme-docs'

Instructions to set up your Optimism node.

## Requirements

- [Setup your Axelar validator](/validator/setup)
- Minimum hardware requirements: 8 AWS vCPU+, 16GB RAM, 80GB+ free storage space.
- MacOS or Ubuntu 20.04 (tested on 20.04)
- [Official Documentation](https://community.optimism.io/docs/developers/build/run-a-node/#)


## Prerequisites
```bash
sudo apt-get install jq -y
snap install docker 
```

## Clone Repo
<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="bash">
{`
git clone https://github.com/smartcontracts/simple-optimism-node.git
cd simple-optimism-node
cp .env.example .env
`}
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="bash">
{`
git clone https://github.com/ethereum-optimism/simple-optimism-node.git
cd simple-optimism-node
cp .env.example .env
`}
</CodeBlock>
}
]} />


## Set variables
<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="bash">
{`
NETWORK_NAME=mainnet
NODE_TYPE=full
# can be l1 or l2
SYNC_SOURCE=
#  l2 node to check blocks against
HEALTHCHECK__REFERENCE_RPC_PROVIDER=
# l1 node RPC to check state roots against
FAULT_DETECTOR__L1_RPC_PROVIDER=
# can be l1 node or l2 node, depends on what sync source you have mentioned in the variable SYNC_SOURCE
DATA_TRANSPORT_LAYER__RPC_ENDPOINT=
`}
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="bash">
{`
# only goerli is supported for now
NETWORK_NAME=goerli
# can be full or archive
NODE_TYPE=full
# only download option is available for now
BEDROCK_SOURCE=download
# L1 node that the op-node will get chain data from - if you are using third party - make sure it will not get rate limited
OP_NODE__RPC_ENDPOINT=
# Use basic for OP_NODE__RPC_TYPE if you are using your own node in OP_NODE__RPC_ENDPOINT
# Other options are: alchemy, quicknode, infura, parity, nethermind, debug_geth, erigon
# Depending upon which provider you are using in OP_NODE__RPC_ENDPOINT, mentioning the right
# OP_NODE__RPC_TYPE will optimize the process
OP_NODE__RPC_TYPE=
`}
</CodeBlock>
}
]} />

#### Example Variables
These examples include 3rd party RPCs and are just to give you an idea, if you decide to use them, remember to make sure you are not getting rate limited when syncing
<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="bash">
{`
NETWORK_NAME=mainnet
NODE_TYPE=full
SYNC_SOURCE=l1
HEALTHCHECK__REFERENCE_RPC_PROVIDER=https://mainnet.optimism.io
FAULT_DETECTOR__L1_RPC_PROVIDER=https://mainnet.infura.io/v3/your_infura_key
DATA_TRANSPORT_LAYER__RPC_ENDPOINT=https://mainnet.infura.io/v3/your_infura_key
`}
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="bash">
{`
NETWORK_NAME=goerli
NODE_TYPE=full
BEDROCK_SOURCE=download
OP_NODE__RPC_ENDPOINT=https://goerli.infura.io/v3/your_infura_key
OP_NODE__RPC_TYPE=infura
`}
</CodeBlock>
}
]} />


## Update variables in the config
<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="bash">
{`
sed -i "s/NETWORK_NAME *=.*/NETWORK_NAME=$NETWORK_NAME/g" $HOME/simple-optimism-node/.env
sed -i "s/NODE_TYPE *=.*/NODE_TYPE=$NODE_TYPE/g" $HOME/simple-optimism-node/.env
sed -i "s/SYNC_SOURCE *=.*/SYNC_SOURCE=$SYNC_SOURCE/g" $HOME/simple-optimism-node/.env
sed -i "s%HEALTHCHECK__REFERENCE_RPC_PROVIDER *=.*%HEALTHCHECK__REFERENCE_RPC_PROVIDER=$HEALTHCHECK__REFERENCE_RPC_PROVIDER%g" $HOME/simple-optimism-node/.env
sed -i "s%FAULT_DETECTOR__L1_RPC_PROVIDER *=.*%FAULT_DETECTOR__L1_RPC_PROVIDER=$FAULT_DETECTOR__L1_RPC_PROVIDER%g" $HOME/simple-optimism-node/.env
sed -i "s%DATA_TRANSPORT_LAYER__RPC_ENDPOINT *=.*%DATA_TRANSPORT_LAYER__RPC_ENDPOINT=$DATA_TRANSPORT_LAYER__RPC_ENDPOINT%g" $HOME/simple-optimism-node/.env
`}
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="bash">
{`
sed -i "s/NETWORK_NAME *=.*/NETWORK_NAME=$NETWORK_NAME/g" $HOME/simple-optimism-node/.env
sed -i "s/NODE_TYPE *=.*/NODE_TYPE=$NODE_TYPE/g" $HOME/simple-optimism-node/.env
sed -i "s/BEDROCK_SOURCE *=.*/BEDROCK_SOURCE=$BEDROCK_SOURCE/g" $HOME/simple-optimism-node/.env
sed -i "s%OP_NODE__RPC_ENDPOINT *=.*%OP_NODE__RPC_ENDPOINT=$OP_NODE__RPC_ENDPOINT%g" $HOME/simple-optimism-node/.env
sed -i "s/OP_NODE__RPC_TYPE *=.*/OP_NODE__RPC_TYPE=$OP_NODE__RPC_TYPE/g" $HOME/simple-optimism-node/.env
`}
</CodeBlock>
}
]} />

## Run Docker Compose Up
```bash
docker compose up -d
```

This should show an output like this:
```bash
                                                                                                                 37.0s
   ⠿ f77177d712f8 Pull complete                                                                                                                             37.1s
   ⠿ 0fdadfebeb9e Pull complete                                                                                                                             37.2s                                                                                                                           40.5s
   ⠿ e653eb58405d Pull complete                                                                                                                             40.7s
   ⠿ 9811a384d9bd Pull complete                                                                                                                             40.8s
   ⠹ 860a57ef97cb Extracting [=======================>                           ]    166MB/355.3MB                                                         94.3s
   ⠹ a4c5d9f0fbe0 Download complete                                                                                                                         94.3s                                                                                                            94.3s                                                                                                                                    97.4s
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

<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="bash">
{`
#  You should see these 7 services running
simple-optimism-node-dtl-1              "/bin/sh -c /scripts…"   dtl                 running             0.0.0.0:7878->7878/tcp, :::7878->7878/tcp
simple-optimism-node-fault-detector-1   "docker-entrypoint.s…"   fault-detector      running             0.0.0.0:7301->7300/tcp, :::7301->7300/tcp
simple-optimism-node-grafana-1          "/run.sh"                grafana             running             0.0.0.0:3000->3000/tcp, :::3000->3000/tcp
simple-optimism-node-healthcheck-1      "npm run start"          healthcheck         running             0.0.0.0:7300->7300/tcp, :::7300->7300/tcp
simple-optimism-node-influxdb-1         "/entrypoint.sh infl…"   influxdb            running             0.0.0.0:8086->8086/tcp, :::8086->8086/tcp
simple-optimism-node-l2geth-1           "/bin/sh -c '/script…"   l2geth              running             0.0.0.0:9991-9992->8545-8546/tcp, :::9991-9992->8545-8546/tcp
simple-optimism-node-prometheus-1       "/bin/prometheus --c…"   prometheus          running             0.0.0.0:9090->9090/tcp, :::9090->9090/tcp
`}
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="bash">
{`
# You should see these 4 services running
NAME                              COMMAND                  SERVICE             STATUS              PORTS
simple-optimism-node-influxdb-1   "/entrypoint.sh infl…"   influxdb            running             0.0.0.0:8086->8086/tcp, :::8086->8086/tcp
simple-optimism-node-op-geth-1    "/bin/sh -c '/script…"   op-geth             running             0.0.0.0:9991-9992->8545-8546/tcp, :::9991-9992->8545-8546/tcp
simple-optimism-node-op-node-1    "/bin/sh -c '/script…"   op-node             running             
simple-optimism-node-torrent-1    "/init"                  torrent             running             0.0.0.0:6881->6881/tcp, 0.0.0.0:6881->6881/udp, :::6881->6881/tcp, :::6881->6881/udp
`}
</CodeBlock>
}
]} />


## Check logs

## Testnet

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

## Mainnet

#### Verify l2geth logs
```bash
 docker compose logs l2geth -f
```
Initially you will see something like
```bash
simple-optimism-node-l2geth-1  | INFO [01-22|11:17:29.788] Fetching genesis file                    url=https://storage.googleapis.com/optimism/mainnet/genesis-berlin.json

simple-optimism-node-l2geth-1  | INFO [01-22|11:17:58.542] Maximum peer count                       ETH=50 LES=0 total=50
simple-optimism-node-l2geth-1  | INFO [01-22|11:17:58.542] Smartcard socket not found, disabling    err="stat /run/pcscd/pcscd.comm: no such file or directory"
simple-optimism-node-l2geth-1  | INFO [01-22|11:17:58.543] Allocated cache and file handles         database=/geth/geth/chaindata cache=16.00MiB handles=16
simple-optimism-node-l2geth-1  | INFO [01-22|11:17:58.550] Writing custom genesis block 
simple-optimism-node-l2geth-1  | INFO [01-22|11:19:55.796] Persisted trie from memory database      nodes=4883110 size=490.96MiB time=59.237370789s gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=-48932.00B
simple-optimism-node-l2geth-1  | INFO [01-22|11:19:55.815] Successfully wrote genesis state         database=chaindata            hash=7ca38a…3fa48b
simple-optimism-node-l2geth-1  | INFO [01-22|11:19:55.816] Allocated cache and file handles         database=/geth/geth/lightchaindata cache=16.00MiB handles=16
simple-optimism-node-l2geth-1  | INFO [01-22|11:19:55.821] Writing custom genesis block 
```
Finally it will start syncing
```bash
0a74d54694b0b51d
simple-optimism-node-l2geth-1  | DEBUG[01-22|11:22:53.736] Applying transaction to tip              index=14359 hash=0xf4b4411f0e93a7e9701d433dd2b834acc268d83f6c29d8f2c740275ca2a2d8ae origin=sequencer
simple-optimism-node-l2geth-1  | DEBUG[01-22|11:22:53.736] Attempting to commit rollup transaction  hash=0xf4b4411f0e93a7e9701d433dd2b834acc268d83f6c29d8f2c740275ca2a2d8ae
simple-optimism-node-l2geth-1  | INFO [01-22|11:22:53.737] New block                                index=14359 l1-timestamp=1636718607 l1-blocknumber=13601184 tx-hash=0xf4b4411f0e93a7e9701d433dd2b834acc268d83f6c29d8f2c740275ca2a2d8ae queue-orign=sequencer gas=116237  fees=1.16237e-07     elapsed=1.172ms
simple-optimism-node-l2geth-1  | DEBUG[01-22|11:22:53.739] Miner got new head                       height=14360 block-hash=0x0c6acc7574f4dc329a3161ffd44558900850f7892ff9acabf14fbb1bca52cbac tx-hash=0xf4b4411f0e93a7e9701d433dd2b834acc268d83f6c29d8f2c740275ca2a2d8ae tx-hash=0xf4b4411f0e93a7e9701d433dd2b834acc268d83f6c29d8f2c740275ca2a2d8ae
simple-optimism-node-l2geth-1  | DEBUG[01-22|11:22:53.739] Applying transaction to tip              index=14360 hash=0xe6eec01b7028500ae38b306571726c90f29a61c74b9b25db6c2a24e736c43660 origin=sequencer
simple-optimism-node-l2geth-1  | DEBUG[01-22|11:22:53.739] Attempting to commit rollup transaction  hash=0xe6eec01b7028500ae38b306571726c90f29a61c74b9b25db6c2a24e736c43660
simple-optimism-node-l2geth-1  | INFO [01-22|11:22:53.741] New block                                index=14360 l1-timestamp=1636718607 l1-blocknumber=13601184 tx-hash=0xe6eec01b7028500ae38b306571726c90f29a61c74b9b25db6c2a24e736c43660 queue-orign=sequencer gas=177459  fees=1.77459e-07     elapsed=1.538ms
simple-optimism-node-l2geth-1  | DEBUG[01-22|11:22:53.742] Miner got new head                       height=14361 block-hash=0x6c26c64af02e1ea5b906da31318cda572b30c67c460eebfde7bb93db639a29ac tx-hash=0xe6eec01b7028500ae38b306571726c90f29a61c74b9b25db6c2a24e736c43660 tx-hash=0xe6eec01b7028500ae38b306571726c90f29a61c74b9b25db6c2a24e736c43660
simple-optimism-node-l2geth-1  | DEBUG[01-22|11:22:53.742] Applying transaction to tip              index=14361 hash=0x34ea5120592a2b60cd969b0cec4111ea1db0d7288e7b78df8effe57508da7482 origin=sequencer
simple-optimism-node-l2geth-1  | DEBUG[01-22|11:22:53.742] Attempting to commit rollup transaction  hash=0x34ea5120592a2b60cd969b0cec4111ea1db0d7288e7b78df8effe57508da7482
simple-optimism-node-l2geth-1  | INFO [01-22|11:22:53.744] New block                                index=14361 l1-timestamp=1636718607 l1-blocknumber=13601184 tx-hash=0x34ea5120592a2b60cd969b0cec4111ea1db0d7288e7b78df8effe57508da7482 queue-orign=sequencer gas=156951  fees=1.56951e-07     elapsed=1.642ms
simple-optimism-node-l2geth-1  | DEBUG[01-22|11:22:53.746] Miner got new head                       height=14362 block-hash=0x433fd81339afa9096c6c4f2cc45aa289fe3b3d926e740e0bb80cd769c448295f tx-hash=0x34ea5120592a2b60cd969b0cec4111ea1db0d7288e7b78df8effe57508da7482 tx-hash=0x34ea5120592a2b60cd969b0cec4111ea1db0d7288e7b78df8effe57508da7482
simple-optimism-node-l2geth-1  | DEBUG[01-22|11:22:53.746] Applying transaction to tip              index=14362 hash=0x3efe7790d5f96bbbef1aea405734ad802d271a1d889febfaa91844608edb097d origin=sequencer
```
#### Verify dtl logs
```bash
docker compose logs dtl -f
```

```bash
simple-optimism-node-dtl-1  | {"level":30,"time":1674386601388,"method":"GET","url":"/batch/transaction/index/139","elapsed":3,"msg":"Served HTTP Request"}
simple-optimism-node-dtl-1  | {"level":30,"time":1674386601861,"method":"GET","url":"/batch/transaction/index/140","elapsed":3,"msg":"Served HTTP Request"}
simple-optimism-node-dtl-1  | {"level":30,"time":1674386602362,"method":"GET","url":"/batch/transaction/index/141","elapsed":3,"msg":"Served HTTP Request"}
simple-optimism-node-dtl-1  | {"level":30,"time":1674386602915,"method":"GET","url":"/batch/transaction/latest","elapsed":3,"msg":"Served HTTP Request"}
simple-optimism-node-dtl-1  | {"level":30,"time":1674386602923,"method":"GET","url":"/batch/transaction/latest","elapsed":3,"msg":"Served HTTP Request"}
simple-optimism-node-dtl-1  | {"level":30,"time":1674386602930,"method":"GET","url":"/batch/transaction/index/142","elapsed":3,"msg":"Served HTTP Request"}
simple-optimism-node-dtl-1  | {"level":30,"time":1674386603499,"method":"GET","url":"/batch/transaction/index/143","elapsed":15,"msg":"Served HTTP Request"}
simple-optimism-node-dtl-1  | {"level":30,"time":1674386604104,"method":"GET","url":"/batch/transaction/index/144","elapsed":3,"msg":"Served HTTP Request"}
simple-optimism-node-dtl-1  | {"level":30,"time":1674386604635,"method":"GET","url":"/batch/transaction/index/145","elapsed":4,"msg":"Served HTTP Request"}
simple-optimism-node-dtl-1  | {"level":30,"time":1674386605243,"method":"GET","url":"/batch/transaction/index/146","elapsed":3,"msg":"Served HTTP Request"}
```

#### Verify fault-detector logs 
```bash
docker compose logs fault-detector -f
```
```bash
simple-optimism-node-fault-detector-1  | {"level":30,"time":1674386539264,"log":"172.22.0.7 - GET /metrics HTTP/1.1 200 - - 2.639 ms\n","msg":"server log"}
simple-optimism-node-fault-detector-1  | {"level":30,"time":1674386554265,"log":"172.22.0.7 - GET /metrics HTTP/1.1 200 - - 3.836 ms\n","msg":"server log"}
simple-optimism-node-fault-detector-1  | {"level":30,"time":1674386569266,"log":"172.22.0.7 - GET /metrics HTTP/1.1 200 - - 3.624 ms\n","msg":"server log"}
simple-optimism-node-fault-detector-1  | {"level":30,"time":1674386584265,"log":"172.22.0.7 - GET /metrics HTTP/1.1 200 - - 3.928 ms\n","msg":"server log"}
simple-optimism-node-fault-detector-1  | {"level":30,"time":1674386599264,"log":"172.22.0.7 - GET /metrics HTTP/1.1 200 - - 2.452 ms\n","msg":"server log"}
simple-optimism-node-fault-detector-1  | {"level":30,"time":1674386614265,"log":"172.22.0.7 - GET /metrics HTTP/1.1 200 - - 3.352 ms\n","msg":"server log"}
simple-optimism-node-fault-detector-1  | {"level":30,"time":1674386629264,"log":"172.22.0.7 - GET /metrics HTTP/1.1 200 - - 2.516 ms\n","msg":"server log"}
simple-optimism-node-fault-detector-1  | {"level":30,"time":1674386644264,"log":"172.22.0.7 - GET /metrics HTTP/1.1 200 - - 2.639 ms\n","msg":"server log"}
```

## Verify

#### Method 1:
```bash
YOUR_IP=$(curl -4 ifconfig.co)
curl -X POST $YOUR_IP:9991 -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' | jq

```
If you get something like this in response of the above rpc call, your node is setup correctly

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
eth.blockNumber
400040 # it will show you the latest block
```
You can compare the block height on your node with explorer ([mainnet](https://optimistic.etherscan.io) or [testnet](https://goerli-optimism.etherscan.io)), use your RPC only when it has caught up with the latest block height

## Endpoint

```bash
echo "${YOUR_IP}:9991"
```

### Configure vald

In order for `vald` to connect to your Optimism node, your `rpc_addr` should be exposed in
vald's `config.toml`

<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="yaml">
{`
[[axelar_bridge_evm]]
name = "optimism"
l1_chain_name = "Ethereum"
rpc_addr = "http://IP:PORT"
start-with-bridge = true
`}
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="yaml">
{`
[[axelar_bridge_evm]]
name = "optimism"
l1_chain_name = "ethereum-2"
rpc_addr = "http://IP:PORT"
start-with-bridge = true
`}
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


# Filecoin

import { Callout } from 'nextra-theme-docs'
import CodeBlock from '../../../components/code-block'
import Tabs from '../../../components/tabs'
import { Tabs as NextraTabs, Tab as NextraTab } from 'nextra-theme-docs'

Set up your Filecoin Mainnet or Testnet Hyperspace node.

## Prerequisites

- [Setup your Axelar validator](/validator/setup)
- Minimum hardware requirements: 8-core CPU and 32 GiB RAM. Models with support for Intel SHA Extensions (AMD Zen or Intel Ice Lake or newer) will significantly speed things up.
- MacOS or Linux
- Build-essential packages
- Golang
- [Official Documentation Testnet Hyperspace](https://kb.factor8.io/docs/filecoin/testnets/hyperspace)
- [Official Documentation](https://lotus.filecoin.io/lotus/install/linux/)

## Install required dependencies

In order to build `lotus`, you first need to install all of the required dependencies.

### 1. Build lotus from source

You can view the official documentation for details on how to build lotus from source [here](https://lotus.filecoin.io/lotus/install/linux/#building-from-source). Instructions below are for Ubuntu.

Install dependencies
```bash
sudo apt update
sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget aria2 -y && sudo apt upgrade -y
```

Install Rustup

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Install Golang

You must compile the lotus daemon with the [required](https://lotus.filecoin.io/lotus/install/linux/#go) Go version.
```bash
wget -c https://golang.org/dl/go1.19.7.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc
```

Clone the lotus repository

```bash
git clone https://github.com/filecoin-project/lotus.git
cd lotus/
```

If you have an AMD Zen or Intel Ice Lake CPU (i.e 10th gen Intel Core/3rd gen Xeon) or newer,
enable [FFI optimizations](https://lotus.filecoin.io/lotus/install/linux/#native-filecoin-ffi) by setting the env vars below.

```bash
export RUSTFLAGS="-C target-cpu=native -g"
export FFI_BUILD_FROM_SOURCE=1
```

Checkout the correct release and build the daemon.

<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="bash">
git checkout releases;
make clean all;
sudo make install
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="bash">
git checkout v1.20.3-hyperspace-nv21-rpc-p01;
make clean hyperspacenet;
sudo make install
</CodeBlock>
}
]} />

### 2. Starting the Daemon

For systemd service files, the makefile provides a template that can be installed.

Download the latest pruned snapshot.

<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="bash">
aria2c -x5 https://snapshots.mainnet.filops.net/minimal/latest.zst
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="bash">
aria2c -x5 https://snapshots.hyperspace.yoga/hyperspace-latest-pruned.car
</CodeBlock>
}
]} />

Import the snapshot

```bash
lotus daemon --import-snapshot path/to/snapshot.car --halt-after-import
```

Modify the lotus config file `~/.lotus/config.toml`. First, enable the Eth RPC needed by vald. Also set the P2P configuration to use a static port with your public IP.

```toml
[Fevm]
  # EnableEthRPC enables eth_ rpc, and enables storing a mapping of eth transaction hashes to filecoin message Cids.
  # This will also enable the RealTimeFilterAPI and HistoricFilterAPI by default, but they can be disabled by config options above.
  #
  # type: bool
  # env var: LOTUS_FEVM_ENABLEETHRPC
  EnableEthRPC = true

[Libp2p]
  ListenAddresses = ["/ip4/<your-public-ip>/tcp/<port-with-firewall-allow>"] # e.g ["/ip4/1.1.1.1/tcp/9876"]
  AnnounceAddresses = ["/ip4/<your-public-ip>/tcp/<port-with-firewall-allow>"]
  ConnMgrLow = 50
  ConnMgrHigh = 100
  ConnMgrGrace = "20s"
```

You also need to enable the `SplitStore` feature to reduce disk usage. You can read more on this [here](https://docs.filecoin.io/mine/lotus/splitstore/).
`ColdStoreType` needs to be set to `messages` to allow querying FEVM transactions.

```toml
[Chainstore]
  # type: bool
  # env var: LOTUS_CHAINSTORE_ENABLESPLITSTORE
  EnableSplitstore = true

[Chainstore.Splitstore]
  # ColdStoreType specifies the type of the coldstore.
  # It can be "messages" (default) to store only messages, "universal" to store all chain state or "discard" for discarding cold blocks.
  #
  # type: string
  # env var: LOTUS_CHAINSTORE_SPLITSTORE_COLDSTORETYPE
  ColdStoreType = "messages"
```

For systemd service files, the makefile provides a template that can be installed.

```bash
make install-daemon-service
```

In the generated systemd file `/etc/systemd/system/lotus-daemon.service`, under `[Service]`,
set the `LOTUS_PATH` env variable to the config folder (e.g. `/home/ubuntu/.lotus`).

```yaml
[Service]
Environment=LOTUS_PATH="/path/to/.lotus"
MemoryAccounting=true  # Optimize disk usage
```

Start the daemon

```bash
sudo systemctl start lotus-daemon
```

Tail the logs to see if the daemon is syncing

```bash
tail -F /var/log/lotus/daemon.log
```

You should eventually (approx 5-10 minutes) see something like this in the logs:

```logs
{"level":"info","ts":"2023-03-30T01:29:02.455Z","logger":"chain","caller":"chain/sync.go:625","msg":"block validation","took":0.030020629,"height":"2301","age":6221912.455308664}
{"level":"info","ts":"2023-03-30T01:29:02.487Z","logger":"chain","caller":"chain/sync.go:625","msg":"block validation","took":0.029449958,"height":"2302","age":6221882.487074932}
{"level":"info","ts":"2023-03-30T01:29:02.488Z","logger":"chain","caller":"chain/sync.go:625","msg":"block validation","took":0.031201571,"height":"2302","age":6221882.488814413}
{"level":"info","ts":"2023-03-30T01:29:02.519Z","logger":"chain","caller":"chain/sync.go:625","msg":"block validation","took":0.02858384,"height":"2303","age":6221852.519261811}
{"level":"info","ts":"2023-03-30T01:29:02.520Z","logger":"chain","caller":"chain/sync.go:625","msg":"block validation","took":0.030298414,"height":"2303","age":6221852.520997515}
{"level":"info","ts":"2023-03-30T01:29:02.550Z","logger":"chain","caller":"chain/sync.go:625","msg":"block validation","took":0.027933658,"height":"2304","age":6221822.550828792}
{"level":"info","ts":"2023-03-30T01:29:02.552Z","logger":"chain","caller":"chain/sync.go:625","msg":"block validation","took":0.029913401,"height":"2304","age":6221822.552771758}
{"level":"info","ts":"2023-03-30T01:29:02.583Z","logger":"chain","caller":"chain/sync.go:625","msg":"block validation","took":0.028520766,"height":"2305","age":6221792.583270292}
{"level":"info","ts":"2023-03-30T01:29:02.585Z","logger":"chain","caller":"chain/sync.go:625","msg":"block validation","took":0.030328811,"height":"2305","age":6221792.585082853}
```

You can also run the following command to wait on the status of your node, you will have to wait a few minutes before this command runs:

```bash
lotus sync wait
```

### 3. Test your Filecoin RPC connection

Once the node is running you can test the RPC.

```bash
curl -X POST 'http://localhost:1234/rpc/v1' \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.ChainHead","params":[]}' \
  | jq
```

Once your node is fully synced, query the latest block number using the following EVM query:

```bash
curl --location --request POST 'http://localhost:1234/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
  "jsonrpc":"2.0",
  "method":"eth_blockNumber",
  "params":[],
  "id":1
}' | jq
```

Verify that the block number matches the latest block number on the explorer.

[Mainnet Explorer](https://filfox.info/en/tipset)

[Testnet Explorer](https://hyperspace.filfox.info/en/tipset)

### Configure vald

In order for `vald` to connect to your Filecoin node, your `rpc_addr` should be exposed in
vald's `config.toml`


<NextraTabs items={['Mainnet', 'Testnet']}>
  <NextraTab>
  ```bash
  [[axelar_bridge_evm]]
  name = "filecoin"
  rpc_addr = "http://localhost:1234/rpc/v1"
  start-with-bridge = true
  ```
  </NextraTab>
  <NextraTab>
  ```bash
  [[axelar_bridge_evm]]
  name = "filecoin"
  rpc_addr = "http://localhost:1234/rpc/v1"
  start-with-bridge = true
  ```
  </NextraTab>
</NextraTabs>

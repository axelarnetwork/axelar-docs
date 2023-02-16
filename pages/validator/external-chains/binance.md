# Binance
-------------

import Callout from 'nextra-theme-docs/callout'
import Markdown from 'markdown-to-jsx'
import Tabs from '../../../components/tabs'
import CodeBlock from '../../../components/code-block'


Instructions to set up your Binance node.

## Requirements

- [Setup your Axelar validator](/validator/setup)
- Minimum hardware requirements: 16 AWS vCPU+, 64GB RAM, 2TB+ free storage space.
- MacOS or Ubuntu 20.04 (tested on 20.04)
- [Official Documentation](https://docs.bnbchain.org/docs/validator/fullnode/)


## Prerequisites
```bash
sudo apt-get install wget jq unzip aria2 lz4 -y
```

# BSC geth

Check the appropriate version for the network accordingly [in their docs](https://docs.bnbchain.org/docs/validator/fullnode/) or choose the [latest release](https://github.com/bnb-chain/bsc/releases)

```bash
# This is an example - check their docs and release page to opt for the right version
BSC_GETH_RELEASE=v1.1.18_hf
```
```bash
# verify correct version
echo $BSC_GETH_RELEASE

# create a temp dir for binaries
cd $HOME
mkdir binaries && cd binaries

# if you are on linux amd
wget https://github.com/bnb-chain/bsc/releases/download/$BSC_GETH_RELEASE/geth_linux
mv geth_linux geth
chmod +x *
sudo mv * /usr/bin/
# verify version
geth version
cd $HOME
```



<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="bash">
{`mkdir -p $HOME/.bsc/config
cd $HOME/.bsc/config
wget https://github.com/bnb-chain/bsc/releases/download/$BSC_GETH_RELEASE/mainnet.zip
unzip mainnet.zip
rm mainnet.zip
`}
</CodeBlock>
},
{ title: "Testnet", content: <CodeBlock language="bash">
{`mkdir $HOME/.bsc/config
cd $HOME/.bsc/config
wget https://github.com/binance-chain/bsc/releases/download/$BSC_GETH_RELEASE/testnet.zip
unzip testnet.zip
rm testnet.zip
`}
</CodeBlock>
}
]} />




## Initialize the node or sync from snapshot

#### 1. If you want to sync from genesis
```bash
cd $HOME
geth --datadir $HOME/.bsc init genesis.json
```
#### 2. If you want to sync from snapshot - Mainnet Only
You find the snapshot links  [here](https://github.com/bnb-chain/bsc-snapshots) or [here](https://github.com/48Club/bsc-snapshots#download) to sync from snapshot

```bash
# change the url to latest snapshot available: you can find it in the links shared above
GETH_SNAPSHOT_URL=https://snapshots.48.club/geth.24761776.tar.lz4
```
```bash
cd $HOME/.bsc/
aria2c -s14 -x14 -k100M $GETH_SNAPSHOT_URL -o geth.tar.lz4
# check checksum: it will take time to calculate checksum
openssl sha256 geth.tar.lz4
# uncompress the file
lz4 -cd geth.tar.lz4 | tar xf -
rm geth.tar.lz4
```

## Create Service

Note: The following settings will allow your node to be accessed publicly from any machine, adjust the flags according if you don't prefer that.

```bash
sudo tee /etc/systemd/system/geth.service > /dev/null <<EOF
[Unit]
Description=Geth node
After=online.target

[Service]
Type=simple
User=root 
ExecStart=/usr/bin/geth --config $HOME/.bsc/config/config.toml --txlookuplimit=0 --syncmode=full --tries-verify-mode=none --pruneancient=true --diffblock=5000 --cache 8000 --rpc.allow-unprotected-txs --datadir $HOME/.bsc --http --http.vhosts "*" --http.addr 0.0.0.0 --ws --ws.origins '*' --ws.addr 0.0.0.0 --http.port 8545
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF
```

By default it will log the logs in `$HOME/.bsc/bsc.log` if you want to use journalctl to view logs, comment out the log setting in config
```bash
sed -i '/Node.LogConfig/s/^/#/' $HOME/.bsc/config/config.toml
sed -i '/FilePath/s/^/#/' $HOME/.bsc/config/config.toml
sed -i '/MaxBytesSize/s/^/#/' $HOME/.bsc/config/config.toml
sed -i '/Level/s/^/#/' $HOME/.bsc/config/config.toml
sed -i '/FileRoot/s/^/#/' $HOME/.bsc/config/config.toml
```
# Start the service
```bash
sudo systemctl daemon-reload
sudo systemctl enable geth
sudo systemctl restart geth
```
## Check logs

```bash
# change log settings to persistent if not already
sed -i 's/#Storage=auto/Storage=persistent/g' /etc/systemd/journald.conf
sudo systemctl restart systemd-journald
journalctl -u geth.service -f -n 100 -o cat
```

Logs should appear like this

#### If you are syncing from genesis
```bash
INFO [01-12|07:22:26.423] Downloader queue stats                   receiptTasks=118 blockTasks=34418 itemSize=658.90B throttle=8192
INFO [01-12|07:22:26.464] Imported new block receipts              count=91   elapsed=39.135ms  number=80616      hash=f2b5af..d57e5c age=2y4mo3w size=39.74KiB
INFO [01-12|07:22:26.474] Imported new block receipts              count=6    elapsed=9.733ms   number=80622      hash=f79d09..1c21f6 age=2y4mo3w size=7.06KiB
INFO [01-12|07:22:32.668] State sync in progress                   synced=0.40% state=1.41GiB   accounts=699,027@129.75MiB slots=5,819,860@1.19GiB   codes=14583@102.87MiB eta=4h55m52.376s
INFO [01-12|07:22:40.829] State sync in progress                   synced=0.42% state=1.50GiB   accounts=728,900@136.92MiB slots=6,179,853@1.27GiB   codes=14847@104.99MiB eta=5h17m21.796s
INFO [01-12|07:22:48.941] State sync in progress                   synced=0.46% state=1.59GiB   accounts=778,792@148.89MiB slots=6,498,586@1.33GiB   codes=15810@112.04MiB eta=5h20m22.013s
INFO [01-12|07:22:56.983] State sync in progress                   synced=0.51% state=1.67GiB   accounts=848,671@165.66MiB slots=6,789,621@1.39GiB   codes=17191@122.32MiB eta=5h9m44.302s
INFO [01-12|07:23:04.983] State sync in progress                   synced=0.56% state=1.77GiB   accounts=918,383@182.40MiB slots=7,140,091@1.46GiB   codes=18095@129.50MiB eta=5h8m46.202s
```

#### If you are syncing from snapshot
```bash
INFO [01-14|05:21:12.351] Initialising Ethereum protocol           network=56 dbversion=8
INFO [01-14|05:21:12.353] Loaded most recent local header          number=24,761,776 hash=794f37..9792a8 td=49,216,905 age=7h20m3s
INFO [01-14|05:21:12.353] Loaded most recent local full block      number=24,761,776 hash=794f37..9792a8 td=49,216,905 age=7h20m3s
INFO [01-14|05:21:12.353] Loaded most recent local fast block      number=24,761,776 hash=794f37..9792a8 td=49,216,905 age=7h20m3s
```

## Verify

#### Method 1:
```bash
YOUR_IP=$(curl -4 ifconfig.co)
curl -X POST $YOUR_IP:8545 -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' | jq
```
If you get something like this in response of the above rpc call, your node is setup correctly
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x10bcec",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodeBytes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x1792276",
    "startingBlock": "0x1233f",
    "syncedAccountBytes": "0x422a06f3",
    "syncedAccounts": "0x5b14c0",
    "syncedBytecodeBytes": "0x26c0e4d8",
    "syncedBytecodes": "0x13cfd",
    "syncedStorage": "0x38195bc",
    "syncedStorageBytes": "0x2ef128d1b"
  }
}
```
Wait for `"result"` to become `false` before using it in vald config

```json
{"jsonrpc":"2.0","id":1,"result":false}
```

#### Method 2:
You can also check your status by connect to geth console
```bash
geth attach http://localhost:8545
eth.syncing
```

If you get something like this in response, your node is setup correctly
```json
{
  currentBlock: 24000,
  healedBytecodeBytes: 0,
  healedBytecodes: 0,
  healedTrienodeBytes: 0,
  healedTrienodes: 0,
  healingBytecode: 0,
  healingTrienodes: 0,
  highestBlock: 23846000,
  startingBlock: 0,
  syncedAccountBytes: 0,
  syncedAccounts: 0,
  syncedBytecodeBytes: 0,
  syncedBytecodes: 0,
  syncedStorage: 0,
  syncedStorageBytes: 0
}
```

Wait for it to become `false` before using it in vald config

```bash
eth.syncing
false
```

## Endpoint

```bash
echo "${YOUR_IP}:8545"
```

### Configure vald

In order for `vald` to connect to your Binance Smart Chain node, your `rpc_addr` should be exposed in
vald's `config.toml`

<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="yaml">
{`[[axelar_bridge_evm]]
name = "binance"
rpc_addr = "http://IP:PORT"
start-with-bridge = true`}
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="yaml">
{`[[axelar_bridge_evm]]
name = "binance"
rpc_addr = "http://IP:PORT"
start-with-bridge = true`}
</CodeBlock>
}
]} />

# Avalanche
-----------

import Markdown from 'markdown-to-jsx'
import Tabs from '../../../components/tabs'
import CodeBlock from '../../../components/code-block'

Instructions to set up your Avalanche node.

## Requirements

- [Setup your Axelar validator](/validator/setup)
- Minimum hardware requirements: 8 AWS vCPU+, 16GB RAM, 500GB+ free storage space.
- MacOS or Ubuntu 20.04 (tested on 20.04)
- [Official Documentation](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node)


## Prerequisites
```bash
sudo apt-get install wget jq -y
```



## Get Binaries

Check the appropriate version for the network accordingly [in their docs](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node) or choose the [latest release](https://github.com/ava-labs/avalanchego/releases)

<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="bash">
{`# This is an example - check their docs and release page to opt for the right version
AVALANCHEGO=v1.9.3
`}
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="bash">
{`# This is an example - check their docs and release page to opt for the right version
AVALANCHEGO=v1.9.3`}
</CodeBlock>
}
]} />


```bash
# verify correct versions
echo $AVALANCHEGO

# create a temp dir for binaries
cd $HOME
mkdir binaries && cd binaries


# get avalanchego binary and rename
wget https://github.com/ava-labs/avalanchego/releases/download/$AVALANCHEGO/avalanchego-linux-amd64-$AVALANCHEGO.tar.gz
tar -xvf avalanchego-linux-amd64-$AVALANCHEGO.tar.gz
rm avalanchego-linux-amd64-$AVALANCHEGO.tar.gz
cd avalanchego-$AVALANCHEGO

# make binaries executable
chmod +x *

# move to usr bin
sudo mv * /usr/bin/

# get out of binaries directory
cd $HOME

# verify version
avalanchego --version
```

## Set environment variables

Note: Update your shell profile in accordance with the shell you are using

<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="bash">
{"echo export NETWORK_ID=mainnet >> $HOME/.profile"}
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="bash">
{"echo export NETWORK_ID=fuji >> $HOME/.profile"}
</CodeBlock>
}
]} />

Apply your changes

```bash
source $HOME/.profile
```

## Create services

Use `systemctl` to set up service for `avalanchego`.

### avalanchego

```bash
sudo tee <<EOF >/dev/null /etc/systemd/system/avalanchego.service
[Unit]
Description=Avalanche daemon
After=network-online.target

[Service]
User=root
ExecStart=/usr/bin/avalanchego --http-host= --network-id=$NETWORK_ID
Restart=on-failure
RestartSec=3
LimitNOFILE=32768

[Install]
WantedBy=multi-user.target
EOF


# verify and enable
cat /etc/systemd/system/avalanchego.service
sudo systemctl enable avalanchego
```

## Start the service

```bash
sudo systemctl daemon-reload
sudo systemctl restart avalanchego
```

## Check logs

```bash
# change log settings to persistent if not already
sed -i 's/#Storage=auto/Storage=persistent/g' /etc/systemd/journald.conf
sudo systemctl restart systemd-journald

journalctl -u avalanchego.service -f -n 100 -o cat
```
Logs should appear like this
```bash
[11-28|07:50:59.280] INFO <P Chain> bootstrap/bootstrapper.go:481 fetching blocks {"numFetchedBlocks": 85000, "numTotalBlocks": 3241631, "eta": "1h52m8s"}
[11-28|07:51:13.370] INFO <P Chain> bootstrap/bootstrapper.go:481 fetching blocks {"numFetchedBlocks": 90000, "numTotalBlocks": 3241631, "eta": "1h53m58s"}
[11-28|07:51:29.644] INFO <P Chain> bootstrap/bootstrapper.go:481 fetching blocks {"numFetchedBlocks": 95000, "numTotalBlocks": 3241631, "eta": "1h56m46s"}
[11-28|07:51:43.864] INFO <P Chain> bootstrap/bootstrapper.go:481 fetching blocks {"numFetchedBlocks": 100000, "numTotalBlocks": 3241631, "eta": "1h58m12s"}
[11-28|07:51:52.789] INFO <P Chain> bootstrap/bootstrapper.go:481 fetching blocks {"numFetchedBlocks": 105000, "numTotalBlocks": 3241631, "eta": "1h56m50s"}
[11-28|07:52:06.814] INFO <P Chain> bootstrap/bootstrapper.go:481 fetching blocks {"numFetchedBlocks": 110000, "numTotalBlocks": 3241631, "eta": "1h58m0s"}
[11-28|07:52:17.979] INFO <P Chain> bootstrap/bootstrapper.go:481 fetching blocks {"numFetchedBlocks": 115000, "numTotalBlocks": 3241631, "eta": "1h57m45s"}
[11-28|07:52:31.488] INFO <P Chain> bootstrap/bootstrapper.go:481 fetching blocks {"numFetchedBlocks": 120000, "numTotalBlocks": 3241631, "eta": "1h58m31s"}
[11-28|07:52:40.475] INFO <P Chain> bootstrap/bootstrapper.go:481 fetching blocks {"numFetchedBlocks": 125000, "numTotalBlocks": 3241631, "eta": "1h57m20s"}
[11-28|07:52:53.462] INFO <P Chain> bootstrap/bootstrapper.go:481 fetching blocks {"numFetchedBlocks": 130000, "numTotalBlocks": 3241631, "eta": "1h57m49s"}
```

## Verify

```bash
YOUR_IP=$(curl -4 ifconfig.co)

curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' $YOUR_IP:9650/ext/info | jq
```

If you get something like this in response of the above rpc call, your node is setup correctly

Wait for `isBootstrapped` to become true before using it in vald config
```bash
{
  "jsonrpc": "2.0",
  "result": {
    "isBootstrapped": false # wait for it to become true
  },
  "id": 1
}
```

## Endpoint

```bash
echo "${YOUR_IP}:9650/ext/bc/C/rpc"
```

### Configure vald

In order for `vald` to connect to your Avalanche node, your `rpc_addr` should be exposed in
vald's `config.toml`

<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="yaml">
{`[[axelar_bridge_evm]]
name = "Avalanche"
rpc_addr = "http://IP:PORT"
start-with-bridge = true`}
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="yaml">
{`[[axelar_bridge_evm]]
name = "Avalanche"
rpc_addr = "http://IP:PORT"
start-with-bridge = true`}
</CodeBlock>
}
]} />

# Kava

import Callout from 'nextra-theme-docs/callout'
import CodeBlock from '../../../components/code-block'
import Tabs from '../../../components/tabs'

This guide presents you the Kava Node setup for both Testnet and Mainnet, as well as the integration with Axelar Network.

## Prerequisites

- [Setup your Axelar validator](/validator/setup)
- Minimum hardware requirements: 4 core CPU , 8GB RAM
- MacOS or Ubuntu 18.04+
- Build-essential packages
- Golang 1.17+
- [Official Documentation](https://docs.kava.io/docs/participate/validator-node/)

## Install Go
```bash
# First remove existing old Go installation
sudo rm -rf /usr/local/go

# Download and verify go
curl -O https://dl.google.com/go/go1.18.7.linux-amd64.tar.gz
sha256sum --check <<EOF
6c967efc22152ce3124fc35cdf50fc686870120c5fd2107234d05d450a6105d8  $HOME/go1.18.7.linux-amd64.tar.gz
EOF

# install
sudo tar -xvf go1.18.7.linux-amd64.tar.gz
sudo mv go /usr/local

# Update environment variables to include go
cat <<'EOF' >>$HOME/.profile
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export GO111MODULE=on
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
EOF
source $HOME/.profile

# Verify that Go is installed:
go version
```

## Install Kava
```bash
git clone https://github.com/Kava-Labs/kava
cd kava
```

<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="bash">
git checkout v0.19.0
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="bash">
git checkout v0.19.5-testnet
</CodeBlock>
}
]} />

```bash
make install

# verify versions
kava version --long
```

## Initialize Kava Node and create necessary toml files

Initialize Kava
<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="bash">
kava init [your_moniker_name] --chain-id kava_2222-10
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="bash">
kava init [your_moniker_name] --chain-id kava_2221-16000
</CodeBlock>
}
]} />

```bash
kava tendermint unsafe-reset-all --home $HOME/.kava
cd $HOME/.kava/config
rm genesis.json
```

Download Genesis File

<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="bash">
wget https://kava-genesis-files.s3.us-east-1.amazonaws.com/kava_2222-10/genesis.json
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="bash">
wget https://raw.githubusercontent.com/Kava-Labs/kava-testnets/master/16000/genesis.json
</CodeBlock>
}
]} />


Edit your config.toml file and add the following persistent peers.

<Tabs tabs={[
{
title: "Mainnet",
content: <CodeBlock language="bash">
persistent_peers = "2a15d9c39eea97b4cf00480b45d4ea32a2e173d0@94.130.78.22:26656,5a933891627e8bde0c4bd0b43c9f99b706e520a2@141.95.99.214:11656,ab3064c37d406245fa2d6e6109395518e8ac8a4c@95.111.255.148:26656,41d88639239c55fd37279d24df507238e1c417ea@85.237.192.104:26656,b23050c89f8cb2f4099688b2bcd60f49b15f41d1@95.214.53.217:26656,d5db8898d40054c07442f3364b32f7fac2752f5e@188.34.178.92:26656,fc34d9a3aff6026a3dbd531a96a50680df61dd91@50.116.3.21:26656,50e4cad7d5e28f7b6495168f92e12bf810e293fd@142.132.152.187:10856,6885971cdb724fa93034fb9e6a11113a6f555d2a@15.235.53.92:11656,7b5a2b519cb5a7d70f0fc5842829d4cce1262585@65.108.121.153:26656,51cfccb07d5a45efdf98d005159c01f0656751ad@54.165.27.59:26656,f7c894901f450b92614fd051d10854d168ec30b5@65.21.94.20:10856,7393ed21b6dc516fcc0ad33c4fe42bdd295d2795@18.206.217.244:26656,508d7ec33c7f3c9c479ca9b845cadbbefee670f7@162.55.133.237:21656,d68410115d7681196651e7fece9e4cafc0456856@3.0.206.176:26656,4cfdd459466cfd492d66b7a5fe26cde96e35d735@182.48.203.7:26656,63ec88e98fc267fb82fa62a51ca5c0a2c115d749@51.38.53.4:27656,ebc272824924ea1a27ea3183dd0b9ba713494f83@185.16.39.172:26656,4efe3caf3b8c0ca197d40756f3bb1bd6081bf18d@51.210.220.20:36656,c124ce0b508e8b9ed1c5b6957f362225659b5343@136.243.248.185:26656,82588f011491c6100d922d133f52fc23460b9231@95.217.91.233:26656,8b5c4a890c8ae7efbbe3360af71be1c3c3a9e12e@121.78.241.68:46656,ce203135031ab08fc0ddff5bd13806e25f21b91d@3.115.125.121:26656,dcd6026ebe5586ed0e94751090f8290b5997666b@5.189.165.172:26656,bc61c26018f65e54232b7e9e99bf7599dffeb78b@13.56.56.180:26656"\\
seeds = "b334e291ac361f9a1cf253d290047700b488b679@52.2.147.96:26656"
</CodeBlock>
},
{
title: "Testnet",
content: <CodeBlock language="bash">
persistent_peers = "0ecf6974e645d267e1c40223fabc59521229de5a@203.238.191.195:26656,19a109e7b1bdbe020db34d883fc740006fd96d9e@54.205.248.136:26656,a610e40ec9c15ceab183bdc71e94fbf9c4c91d70@54.91.207.93:26656,0264f7762530ef4e637f0fcb866bea0b2ea68dd9@34.198.224.121:26656,c22a30eee9f4873a7891603a567d5825db4583a4@65.21.232.149:26756,b2dc431ea24139d5d2d728d6edb546b3dd8ca8ec@54.85.1.24:26656,cb44d1deb4b1732adc1fb81e2bdeed097c5052c2@195.201.108.152:26656,2a0fd732f484647a34076d03501b5ade76a0d056@54.162.132.18:26656,9b2b83d1bccab3c388c379f6b7a19146ee9b4d8b@161.97.155.94:30656,5af375a8f1fb5879087ea573e30976f084f23769@167.235.244.61:26656,8be1950812fe31c91a63eab482d13276fb7cc4c7@95.217.214.138:26656,e2e9d76fb4658f1757d4b51ef34ebbd1e857d1c5@88.99.25.84:26656,b9f759ca8cf1179ac10b36e6f458c69bf5ee2b85@89.149.218.18:26656,0e7c323c8d558f3aeecee09a679f39f7842287ca@52.207.243.95:26656,ddcc5e1b405fbf5763c7c1b3932c44f3f0917a58@50.19.243.132:26656,220aa32bc7279a43a2ce9af0393945c357e88b27@86.111.48.129:26656,25b3e8aa0c0a7bb47710cb5be1a700c243da211c@3.93.65.190:26656,2972850c607f65354af82c75382fa1745d46b63a@65.21.126.182:26656,9d0bad73fbf1bc53b3e8b4b3c7873980b1843524@18.207.210.224:26656,547f3b5f5907339794f6231d71ac0bd2246bdcb9@65.108.124.57:21656,353ae6090dc1fffb66d55faef6b6133693907af4@3.83.193.144:26656,80f5c216dbb472b483a578154167953c3a2913bb@34.224.245.49:26656,0f7c1725cacc5be8000209bbce4be55b7b5d7fe5@18.232.239.76:26656,4b127af8f935836798fb24b451849c6a28b0bf26@222.106.187.14:54506,a3176f14632e2ce70b879fd7c74b3e63626559d2@54.156.38.39:26656,47b3b6a795febcf3de0b50a65d383a8573e26289@3.80.131.4:26656,8d25035ba3da76aa8257cea0a110ea586511312e@65.109.26.45:26656,3b21dbf61555cbbc3828fca3af26737b81104a32@86.111.48.130:26656,ed0212d3afc1d6c9a02b785ca1577e1ee6609672@52.205.115.127:26656,d4b23cf74b22ea4c8be862151486dd7301e0b84b@44.199.250.214:26656,0f3bcd2ac6f13522600a7a20861c4c5354bf518e@34.226.104.212:26656,b859111f93f4d461a6de749e865c7fef2ac912d8@139.162.210.87:26656"
</CodeBlock>
}
]} />

Add minium gas prices into app.toml
```bash
minimum-gas-prices = "0.025ukava;1000000000akava"
```

Do the rest of the port configuration as desired; The EVM configuration and ports can be found in the app.toml under ection "EVM Configuration"

## State sync script

<Tabs tabs={[
{
title: "Mainnet RPC",
content: <CodeBlock language="bash">
https://kava-mainnet.chainode.tech:443
</CodeBlock>
},
{
title: "Testnet RPC",
content: <CodeBlock language="bash">
https://kava-testnet.chainode.tech:443
</CodeBlock>
}
]} />

```bash
# create state sync script
nano statesync.sh
```

Add the content below and change the RPC var for desired network
```bash
#!/bin/bash

RPC="https://kava-testnet.chainode.tech:443"

LATEST_HEIGHT=$(curl -s $RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 1000)); \
TRUST_HASH=$(curl -s "$RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)

sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$RPC,$RPC\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"|" $HOME/.kava/config/config.toml
```

Assign the correct access rights
```bash
chmod 700 statesync.sh
```

Execute the script
```bash
./statesync.sh
```


## Start Kava Node with systemd
```bash
sudo tee <<EOF >/dev/null /etc/systemd/system/kvd.service
[Unit]
Description=KAVA daemon
After=network-online.target

[Service]
User=<your_user>
ExecStart=/home/<your_user>/go/bin/kava start
Restart=on-failure
RestartSec=3
LimitNOFILE=16384

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable kvd
sudo systemctl daemon-reload
sudo systemctl start kvd
```

## Kava EVM Endpoint integration with Axelar

Once the Kava Node is fully synced you can use the EVM RPC endpoint for the integration with Axelar Network.

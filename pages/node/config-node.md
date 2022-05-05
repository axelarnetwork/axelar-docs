# Node configuration

## Prerequisites

- **Operating system:** MacOS or Ubuntu (tested on 18.04)
- **Hardware:** 4 cores, 8-16GB RAM, 512 GB drive, arm64 or amd64. Recommended 6-8 cores, 16-32 GB RAM, 1 TB+ drive.
- Increase the maximum number of open files on your system. Example: `ulimit -n 16384`. You may wish to add this command to your shell profile so that you don't need to execute it next time you restart your machine.
- [CLI configuration](config-cli).

## Download binaries and initialize configuration

Clone the [`axelerate-community`](https://github.com/axelarnetwork/axelarate-community) repo:

```bash
git clone https://github.com/axelarnetwork/axelarate-community.git
cd axelarate-community
```

Run `setup-node.sh` to download the `axelard` binary and configure your node:

```bash
./scripts/setup-node.sh -n [mainnet|testnet|testnet-2]
```

Some additional flags:

- `-a` : Version of `axelard`.
- `-d` : Home directory path.
- `--help` : Print a complete list of flags.

## Home directory

By default the `setup-node.sh` script sets the home directory for your node as follows:

| Network   | Home directory path   |
| --------- | --------------------- |
| mainnet   | `~/.axelar`           |
| testnet   | `~/.axelar_testnet`   |
| testnet-2 | `~/.axelar_testnet-2` |

On a fresh install `setup-node.sh` puts the following in your node's home directory:

```
.axelar
├── bin
│   ├── axelard -> /Users/gus/.foo/bin/axelard-v0.17.3
│   └── axelard-v0.17.3
├── config
│   ├── app.toml
│   ├── config.toml
│   ├── genesis.json
│   └── seeds.toml
└── logs
```

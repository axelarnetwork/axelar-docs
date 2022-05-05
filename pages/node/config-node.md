# Node configuration

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

The `axelard` binary can be found in the `/bin` subdirectory of the home.

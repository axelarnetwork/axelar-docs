# Configure companion processes

import Callout from 'nextra-theme-docs/callout'
import Markdown from 'markdown-to-jsx'
import Tabs from '../../../components/tabs'
import CodeBlock from '../../../components/code-block'

Axelar validators need two companion processes called `vald` and `tofnd`.

## Download binaries and initialize configuration

Similar to [Node configuration](../../node/config-node), run `setup-validator.sh` to download and configure `vald` and `tofnd` binaries. In the [`axelerate-community`](https://github.com/axelarnetwork/axelarate-community) repo do:

```bash
./scripts/setup-validator.sh -n [mainnet|testnet|testnet-2]
```

The binary `tofnd` is placed in your `{AXELARD_HOME}/bin` directory. The binary `vald` is actually part of `axelard`.

TODO FIX:

```
.axelar
├── bin
│   ├── axelard -> /Users/gus/.axelar/bin/axelard-v0.17.1
│   ├── axelard-v0.17.1
│   ├── tofnd -> /Users/gus/.axelar/bin/tofnd-v0.10.1
│   └── tofnd-v0.10.1
├── config
│   ├── app.toml
│   ├── config.toml
│   ├── genesis.json
│   └── seeds.toml
├── logs
├── tofnd
└── vald
```

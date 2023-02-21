## axelard query multisig key-id

Returns the key ID assigned to a given chain

```
axelard query multisig key-id [chain] [flags]
```

### Options

```
      --height int    Use a specific height to query state at (this can error if the node is pruning state)
  -h, --help          help for key-id
      --node string   `<host>:<port>` to Tendermint RPC interface for this chain (default "tcp://localhost:26657")
```

### Options inherited from parent commands

```
      --chain-id string     The network chain ID (default "axelar")
      --home string         directory for config and data (default "$HOME/.axelar")
      --log_format string   The logging format (json|plain) (default "plain")
      --log_level string    The logging level (trace|debug|info|warn|error|fatal|panic) (default "info")
      --output string       Output format (text|json) (default "text")
      --trace               print out full stack trace on errors
```

### SEE ALSO

- [axelard query multisig](/cli-docs/v0_31_3/axelard_query_multisig) - Querying commands for the multisig module
## axelard query txs

Query for paginated transactions that match a set of events

### Synopsis

Search for transactions that match the exact given events where results are paginated.
Each event takes the form of '

```json
{eventType}
```

.

```json
{eventAttribute}
```

=

```json
{value}
```

'. Please refer
to each module's documentation for the full set of events to query for. Each module
documents its respective events under 'xx_events'.

Example:

```bash
$ <appd> query txs --events 'message.sender=cosmos1...&message.action=withdraw_delegator_reward' --page 1 --limit 30
```

```
axelard query txs [flags]
```

### Options

````
      --events string   list of transaction events in the form of
```json
 {eventType}
````

.

```json
{eventAttribute}
```

=

```json
{value}

```

--height int Use a specific height to query state at (this can error if the node is pruning state)
-h, --help help for txs
--limit int Query number of transactions results per page returned (default 30)
--node string `<host>:<port>` to Tendermint RPC interface for this chain (default "tcp://localhost:26657")
-o, --output string Output format (text|json) (default "text")
--page int Query a specific page of paginated results (default 1)

```

### Options inherited from parent commands

```

      --chain-id string     The network chain ID (default "axelar")
      --home string         directory for config and data (default "$HOME/.axelar")
      --log_format string   The logging format (json|plain) (default "plain")
      --log_level string    The logging level (trace|debug|info|warn|error|fatal|panic) (default "info")
      --trace               print out full stack trace on errors

```

### SEE ALSO

- [axelard query](/cli-docs/v0_32_0/axelard_query) - Querying subcommands
```

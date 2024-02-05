# CosmWasm Governance Proposals

If you want to create or update a CosmWasm contract on the Axelar blockchain, it must be done via governance proposal. This guide will walk you through the process of creating and submitting a governance proposal with your CosmWasm code.

## Prerequisites and setup

Make sure you have an account has enough funds to create a proposal. Also make sure to have updated version of [axelard](https://docs.axelar.dev/node/config-node) with wasm enabled (`make WASM=true build`).

1. Set the parameters to environment variables

   ```bash
   TESNET=... # fix this value
   RPC=http://...
   GOVERNANCE=axelar10d07y265gmmuvt4z0w9aw880jnsr700j7v9daj # fix this value
   ```

1. If not already, run the optimizer to get the contracts bytecode. This should be done via docker container to ensure that the bytecode is built with the proper environment. The following command will build the contract and save it to the `artifacts` folder.

   ```bash
   docker run --rm -v "$(pwd)":/code --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry cosmwasm/workspace-optimizer-arm64:0.12.13
   ```

## Change upload permission to governance address only

1. Save JSON proposal to file, e.g. `gov-proposal.json`

Example:

    ```json
    {
    "title": "set upload access address to axelar10d07y265gmmuvt4z0w9aw880jnsr700j7v9daj",
    "description": "set wasm code upload access to axelar10d07y265gmmuvt4z0w9aw880jnsr700j7v9daj",
    "changes": [
        {
        "subspace": "wasm",
        "key": "uploadAccess",
        "value": {
            "permission": "AnyOfAddresses",
            "address": "",
            "addresses": ["axelar10d07y265gmmuvt4z0w9aw880jnsr700j7v9daj"]
        }
        }
    ],
    "deposit": "200000000uaxl"
    }

````

1. Set variable to file from previous step

    ```bash
    GOV_PROPOSAL=/Users/you/Projects/Axelar/gov-proposal.json
    DENOM=uaxl
    ```

1. Submit proposal

    ```bash
    axelard tx gov submit-proposal param-change $GOV_PROPOSAL --from test --output json --gas auto --gas-adjustment 2 --gas-prices=0.00005$DENOM --node $RPC --chain-id $TESTNET
    ```

1. Set proposal ID variable based on previous command’s output

   ```bash
   PROPOSAL_ID=4
````

1. Get the network to vote for your proposal

   Ask on Axelar's Discord, Telegram groups, and [Forum](https://community.axelar.network/) for others to vote on your proposal. You can also vote on your proposal with your other accounts.

## Submit governance proposal to upload code

1. Set contract vars to upload. Contract hash could be obtained from optimizer output

   ```bash
   CONTRACT_WASM=artifacts/service_registry-aarch64.wasm
   CONTRACT_SOURCE=https://github.com/axelarnetwork/axelar-amplifier/tree/main/contracts/service-registry # correct this
   CONTRACT_CODE_HASH=20814e7f6a11bb7be119babbd233c3a647a2c8b5d9376eb810729152288d225c
   ```

1. Submit proposal to upload code

   ```bash
   axelard tx gov submit-proposal wasm-store $CONTRACT_WASM --code-source-url $CONTRACT_SOURCE --builder "cosmwasm/workspace-optimizer-arm64:0.12.13" --code-hash $CONTRACT_CODE_HASH --instantiate-anyof-addresses $GOVERNANCE --title "Upload service registry" --description "Upload service registry" --run-as $(axelard keys show -a test) --deposit "200000000uedwin" --from test --output json --gas auto --gas-adjustment 2 --gas-prices=0.00005$DENOM --node $RPC --chain-id $DEVNET
   ```

1. Set proposal ID variable based on the previous command’s output

```bash
PROPOSAL_ID=8
```

1. Get the network to vote for your proposal
   Follow the same steps to get the network to approve your contract storage proposal.

1. Query list of codes to retrieve the new one. It might take a bit for the proposal to be executed

   ```bash
   axelar-service-registry % axelard q wasm list-code --node $RPC --chain-id $DEVNET
   ```

   ```bash
   - code_id: "4"
   creator: axelar1a8ldskqrlkc0pushavypu359s5dvxcs3xgzu69
   data_hash: 20814E7F6A11BB7BE119BABBD233C3A647A2C8B5D9376EB810729152288D225C
   instantiate_permission:
       address: ""
       addresses:
       - axelar10d07y265gmmuvt4z0w9aw880jnsr700j7v9daj
       permission: AnyOfAddresses
   ```

   ```bash
   CODE_ID=4
   ```

## Submit governance proposal to instantiate contract

1. Submit proposal to instantiate. Get the proposal ID from the output

   ```bash
   axelard tx gov submit-proposal instantiate-contract $CODE_ID '{"governance_account":"'$GOVERNANCE'"}' --label service_registry --no-admin --title "Instantiate service registry" --description "Instantiate service registry" --run-as $(axelard keys show -a test) --deposit "200000000uedwin" --from test --output json --gas auto --gas-adjustment 2 --gas-prices=0.00005$DENOM --node $RPC --chain-id $DEVNET
   ```

   ```bash
   PROPOSAL_ID=12
   ```

1. Get the network to vote for your proposal
   Follow the same steps to get the network to approve your contract storage proposal.

1. Query contracts for code_id to get newest address. It might take a bit for the proposal to be executed

   ```bash
   axelard q wasm list-contract-by-code $CODE_ID --node $RPC --chain-id $DEVNET
   ```

   ```bash
   contracts:
   - axelar1zwv6feuzhy6a9wekh96cd57lsarmqlwxdypdsplw6zhfncqw6ftqhk6q2n
   - axelar1ghd753shjuwexxywmgs4xz7x2q732vcnkm6h2pyv9s6ah3hylvrqt7a82d
   - axelar1xt4ahzz2x8hpkc0tk6ekte9x6crw4w6u0r67cyt3kz9syh24pd7scrmm2x
   - axelar1kj8q8g2pmhnagmfepp9jh9g2mda7gzd0m5zdq0s08ulvac8ck4dqz8wvmz
   pagination:
   next_key: null
   total: "0"
   ```

```

```

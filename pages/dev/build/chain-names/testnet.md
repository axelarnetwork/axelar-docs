import ChainList from '../../../../components/chainlist';

# Chain names: Testnet-1 (Lisbon)

The following values are legal arguments for token transfers and General Message Passing calls such as `callContract` and `callContractWithToken`.

The contract call approval at the Axelar gateway and contracts implementing `IAxelarExecutable` contracts will receive precisely these values for the source chain.

Note these names are case-sensitive.

<ChainList environment="testnet" />
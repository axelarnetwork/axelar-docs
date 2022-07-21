# Axelar Gas & Executor Services

## Executor service 

Axelar network provides an optional relayer service, called the Executor service, which observes the gas-paid amount to the Gas Service contract (below). Then, it automatically uses those amounts to relay the approved message to the application’s destination contract.

Users are required to pay gas to the Gas Service contract to activate the executor service. After an attempt to relay the message to the destination contract, the service calculates the remaining gas amount and [refunds](./refund) it to the payer account. The execution result can be monitored on Axelarscan UI or requested through the AxelarJS SDK. Please see the [Monitoring State of GMP Transactions](../monitor-recover/monitoring) section for more information.

## Gas Services
For any General Message Passing (GMP) transaction, the Axelar network routes transctions to their destination chains. The final step of the pipeline (execution) to the specified destination contract address on the destination chain is invoked in one of two ways.

1. Manually paid by the user/application on the destination chain.
2. Executed automatically by Axelar if the user/application prepays gas to the Gas Receiver contract on the source chain.

Gas Receiver is a smart contract deployed on every EVM that is provided by Axelar. Our Gas Services provide users/applications the ability to prepay the full estimated cost for any GMP transaction (from source to destination chains) with the convenience of a single payment on the source chain, relying on Axelar's relay services to manage the full pipeline. Once gas is paid to our gas services for a GMP transaction, Axelar's relayer services pick up the payment and automatically execute the final General Message Passing call.

Developers can use the Gas Services by prepaying upfront the relayer gas fee on the source chain, thereby covering the cost of gas to execute the final transaction on the destination chain.
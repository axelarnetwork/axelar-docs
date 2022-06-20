# Axelar Gas Services

For any GMP transaction, the Axelar Network routes transctions to their destination chains. The final step of the pipeline (execution) to the specified destination contract address on the destination chain is invoked either: 
1. manually paid by the user/application on said destination chain, or
2. executed automatically by Axelar if the user/application prepays gas to the Gas Receiver contract on the source chain.

Gas Receiver is a smart contract deployed on every EVM that is provided by Axelar. Our Gas Services provide users/applications the ability to prepay the full estimated cost for any GMP transaction (from source to destination chains) with the convenience of a single payment on the source chain, relying on Axelar's relay services to manage the full pipeline. Once gas is paid to our gas services for a GMP transaction, Axelar's relayer services pick up the payment and automatically executes the final General Message Passing call.

Developers can use the Gas Services by pre-paying the relayer gas fee on the source chain upfront that would cover the cost of gas to execute the final transaction on the destination chain. 

## Overview of Gas Services

### Pay Gas

An application that wants Axelar to automatically execute contract calls on the destination chain needs to do four things:

1. Estimate the `gasLimit` that the contract call will require on your executable contract on the destination chain.

2. Call the getGasPrice method to get the sourceGasPrice of the desired token that gas will be paid. 

Prerequisite: Axelar SDK needed to be installed. See the instructions here.
[Code snippet]

3. Calculate the amount of token to be paid. 
gasLimit * sourceGasPrice.

4. Pay the AxelarGasService smart contract on the source chain with the calculated amount in step 3. 
[Code snippet.]

Our service does the following:

- Monitors `AxelarGasReceiver` for receipts of payment, and gets the amount paid as `amountPaid`.
- Matches those to contract calls.
- Executes the specified contract call specifying the `gasLimit` specified above. (@PJ, is this right?)

See [[Pay Gas](pay-gas)] for more

### Increase Gas

The prepaid gas to the Gas Service contract (in GMP step 2) could be insufficient when the destination chain is too busy (with many transfers or other conditions). Therefore, Axelar provides options to resubmit a new amount of gas as well as an option to refund the paid gas. The process can be done through the Axelarscan UI, the Axelar SDK, or via direct invocation to the Gas Receiver contract. 

See [[Increase Gas](increase-gas)] for more

### Refund Gas

We plan to add an option to get refunds in case excessive amounts are paid as gas, but this is not yet implemented.
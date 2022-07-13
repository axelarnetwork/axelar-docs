# Refund the prepaid gas

The prepaid gas to `payGasForContractCall` or `payGasForContractCallWithToken` could exceed the actual amount needed for relaying a message to the destination contract.

The executor service automatically tracks the excess gas submitted and refunds it to the payer account. To do so, the service calls `Refund` in the Gas Service contract.

The refunded amount is calculated as follows:
```
The refunded amount = The prepaid amount - the actual gas used - the estimated gas for transferring the refund
```
The refund status will be shown up on Axelarscan after executing the message to the destination contract.

![gmp-gas-refund.png](/images/gmp-gas-refund.png)
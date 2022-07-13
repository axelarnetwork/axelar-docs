# Refund the prepaid gas

The prepaid gas to `payGasForContractCall` or `payGasForContractCallWithToken` could exceed the actual amount needed for relaying a message to the destination contract.

The [Executor service](/dev/gmp/executor-service) automatically calculates the excess gas submitted.
```
The refunded amount = The prepaid amount - the actual gas used - the estimated gas for transferring the refund
```
After getting the refund amount, the service calls `Refund` in the Gas Service contract to refund the calculated amount to the payer account. Then, the refund status will be shown up on Axelarscan UI.

![gmp-gas-refund.png](/images/gmp-gas-refund.png)
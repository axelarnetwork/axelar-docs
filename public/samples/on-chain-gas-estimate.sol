pragma solidity ^0.8.12;

import {AxelarExecutable} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";

contract SenderReceiver is AxelarExecutable {
    IAxelarGasService public immutable gasService;
    string public message;
    uint256 gasLimit = 200000;

    constructor(address gateway_, address gasService_)
        AxelarExecutable(gateway_)
    {
        gasService = IAxelarGasService(gasService_);
    }

    function getEstimate(
        string calldata destinationChain,
        string calldata destinationAddress,
        bytes memory payload
    ) public view returns (uint256) {
        return
            gasService.estimateGasFee(
                destinationChain,
                destinationAddress,
                payload,
                gasLimit,
                ""
            );
    }

    function sendMessage(
        string calldata destinationChain,
        string calldata destinationAddress,
        string calldata message_
    ) external payable {
        bytes memory payload = abi.encode(message_);

        uint256 estimate = getEstimate(
            destinationChain,
            destinationAddress,
            payload
        );

        gasService.payGas{value: estimate}(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            gasLimit, // uint256 executionGasLimit - destination gas limit
            true, // bool estimateOnChain - was this gas estimated on-chain?
            msg.sender, // address refundAddress
            "" // bytes params
        );

        uint256 refund = msg.value - estimate;
        payable(msg.sender).transfer(refund);

        gateway.callContract(destinationChain, destinationAddress, payload);
    }

    function _execute(
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload_
    ) internal override {
        message = abi.decode(payload_, (string));
    }

    
}

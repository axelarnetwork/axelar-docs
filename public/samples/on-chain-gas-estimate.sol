pragma solidity ^0.8.12;

import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';
import { IInterchainGasEstimation } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IInterchainGasEstimation.sol';


contract SenderReceiver is AxelarExecutable {
    IAxelarGasService public immutable gasService;
    IInterchainGasEstimation public immutable estimator;
    string public message;

    constructor(address gateway_, address gasService_) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasService_);
        estimator = IInterchainGasEstimation(gasService_);
    }

    function sendMessage(
        string calldata destinationChain,
        string calldata destinationAddress,
        string calldata message_
    ) external payable {
        bytes memory payload = abi.encode(message_);
        
        uint256 estimate = estimator.estimateGasFee(destinationChain, destinationAddress, payload, 200000, '');


        gasService.payGas{value: estimate} (
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            200000,
            true,
            msg.sender,
            ''
        );

        uint256 refund = msg.value - estimate;
        payable(msg.sender).transfer(refund);

        gateway.callContract(destinationChain,destinationAddress,payload);
    }

    function _execute(
        bytes32 commandId,
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload_
    ) internal override {
        message = abi.decode(payload_, (string));
    }

    function getEstimate(
        string calldata destinationChain,
        string calldata destinationAddress,
        string calldata message_) external view returns (uint256) {
            bytes memory payload = abi.encode(message_);
        return estimator.estimateGasFee(destinationChain, destinationAddress, payload, 200000, '');
    }
}
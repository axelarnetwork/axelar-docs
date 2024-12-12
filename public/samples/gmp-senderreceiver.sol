pragma solidity ^0.8.0;

import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';

contract SenderReceiver is AxelarExecutable {
    IAxelarGasService public immutable gasService;
    string public message;

    constructor(address gateway_, address gasService_) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasService_);
    }

    function sendMessage(
        string calldata destinationChain,
        string calldata destinationAddress,
        string calldata message_
    ) external payable {
        bytes memory payload = abi.encode(message_);
        gasService.payNativeGasForContractCall{value: msg.value} (
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );

        gateway().callContract(destinationChain,destinationAddress,payload);
    }

    function _execute(
        bytes32 commandId, 
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload_
    ) internal override {
        message = abi.decode(payload_, (string));
    }
}
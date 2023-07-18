pragma solidity ^0.8.0;

import { IInterchainTokenService } from '@axelar-network/interchain-token-service/contracts/interfaces/IInterchainTokenService.sol';

// This will deploy standardized tokens everywhere with mint/burn token managers, and will have an initial supply
contract StandardizedTokenExample {
    IInterchainTokenService public immutable service;

    constructor(address service_) {
        service = IInterchainTokenService(service_);
    }

    // Deploy a standardized token on the source chain
    function deployAndRegisterStandardizedToken(bytes32 salt, string calldata name, string calldata symbol, uint8 decimals, uint256 initialSupply) external {
        bytes32 tokenId = service.getCustomTokenId(address(this), salt);
        address tokenManager = service.getTokenManagerAddress(tokenId);
        service.deployAndRegisterStandardizedToken(salt, name, symbol, decimals, initialSupply, tokenManager);
    }

    // Deploy the standardized tokens on the remote chain
    function deployAndRegisterRemoteStandardizedToken(bytes32 salt, string calldata name, string calldata symbol, uint8 decimals, string calldata destinationChain) external payable {
        service.deployAndRegisterRemoteStandardizedToken(salt, name, symbol, decimals, '', '', destinationChain, msg.value);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ITokenManager} from "@axelar-network/interchain-token-service/contracts/interfaces/ITokenManager.sol";
import {ITokenManagerType} from "@axelar-network/interchain-token-service/contracts/interfaces/ITokenManagerType.sol";
import {IInterchainToken} from "@axelar-network/interchain-token-service/contracts/interfaces/IInterchainToken.sol";
import {IInterchainTokenService} from "@axelar-network/interchain-token-service/contracts/interfaces/IInterchainTokenService.sol";

/**
 * This is sample code only and has not been audited.
 * Use this for learning, but verify the functionality
 * and security of your smart contracts before using
 * in production.
 */
contract MyInterchainToken is ERC20, Ownable {
    ITokenManager public tokenManager;
    IInterchainTokenService public service =
    IInterchainTokenService(0x37ED6be138653B3029c3c6c2Aa7e8B7DcD372A11);

    address public creator;

    constructor() ERC20("MyInterchainToken", "MITKN") {
        // Mint 1,000 tokens to the creator
        creator = msg.sender;
        _mint(creator, 1000 * 10**18);

        // Register this token
        deployTokenManager("");
    }

    function deployTokenManager(bytes32 salt) internal {
        bytes memory params = abi.encode(
            msg.sender,
            address(this)
        );
        bytes32 tokenId = service.deployCustomTokenManager(
            salt,
            ITokenManagerType.TokenManagerType.MINT_BURN,
            params
        );
        address tokenManager_ = service.getTokenManagerAddress(tokenId);
        transferOwnership(tokenManager_);
    }

    function myCustomFunction() public {
        // Just an example custom feature
        // Give owner 1,000 more
        _mint(creator, 1000 * 10**18);
    }

    /*
     * Deploy this token, then register it with the Interchain Token Service
     * You'll be given a TokenManager which you can set here, allowing the
     * local send methods to function.
     */
    function setTokenManager(address _tokenManager) public onlyOwner {
        tokenManager = ITokenManager(_tokenManager);
    }

    function interchainTransfer(
        string calldata destinationChain,
        bytes calldata destinationAddress,
        uint256 amount,
        bytes calldata metadata
    ) external payable {
        tokenManager.sendToken(
            destinationChain,
            destinationAddress,
            amount,
            metadata
        );
    }

    function interchainTransferFrom(
        address sender,
        string calldata destinationChain,
        bytes calldata destinationAddress,
        uint256 amount,
        bytes calldata metadata
    ) external payable {
        tokenManager.transmitInterchainTransfer(
            sender,
            destinationChain,
            destinationAddress,
            amount,
            metadata
        );
    }
}

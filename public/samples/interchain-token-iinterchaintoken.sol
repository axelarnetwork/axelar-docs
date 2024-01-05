// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ITokenManager} from "@axelar-network/interchain-token-service/contracts/interfaces/ITokenManager.sol";
import {ITokenManagerType} from "@axelar-network/interchain-token-service/contracts/interfaces/ITokenManagerType.sol";
import {IInterchainToken} from "@axelar-network/interchain-token-service/contracts/interfaces/IInterchainToken.sol";
import {IInterchainTokenService} from "@axelar-network/interchain-token-service/contracts/interfaces/IInterchainTokenService.sol";
import {AddressBytesUtils} from "@axelar-network/interchain-token-service/contracts/libraries/AddressBytesUtils.sol";

/**
 * This is sample code only and has not been audited.
 * Use this for learning, but verify the functionality
 * and security of your smart contracts before using
 * in production.
 */
contract MyInterchainToken is ERC20, Ownable {
    using AddressBytesUtils for address;

    ITokenManager public tokenManager;

    IInterchainTokenService public service =
        IInterchainTokenService(0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C);

    address public creator;

    constructor() ERC20("MyInterchainToken", "MITKN") {
        // Mint 1,000 tokens to the creator
        creator = msg.sender;
        _mint(creator, 1000 * 10**18);

        // Register this token (could also be done 1-time smart contract invocation)
        // Not a good practice beacuse it can't go to non-EVM chains
        deployTokenManager("");
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }

    function deployTokenManager(bytes32 salt) internal {

        bytes memory params = tokenManager.params(
            msg.sender.toBytes(),
            address(this)
        );

        service.deployTokenManager(
            salt,
            "", // This is empty since the token manager is on the local chain but you need to specify it when you deploy on remote chain
            ITokenManagerType.TokenManagerType.MINT_BURN,
            params,
            msg.value // gasValue
        );

        bytes32 tokenId = service.interchainTokenId(
            msg.sender,
            salt
        );

        tokenManager = ITokenManager(service.tokenManagerAddress(tokenId));
    }

    function myCustomFunction() public {
        // Just an example custom feature
        // Give owner 1,000 more
        _mint(creator, 1000 * 10**18);
    }

    /**
     * @notice Initiates an interchain transfer of a specified token to a destination chain.
     * @dev The function retrieves the TokenManager associated with the tokenId.
     * @param tokenId The unique identifier of the token to be transferred.
     * @param destinationChain The destination chain to send the tokens to.
     * @param destinationAddress The address on the destination chain to send the tokens to.
     * @param amount The amount of tokens to be transferred.
     * @param metadata Optional metadata for the call for additional effects (such as calling a destination contract).
     */
    function interchainTransfer(
        bytes tokenId,
        string calldata destinationChain,
        bytes calldata recipient,
        uint256 amount,
        bytes calldata metadata,
        uint256 gasValue
    ) external payable {
        address sender = msg.sender;

        service.transmitInterchainTransfer{ value: msg.value}(
            tokenId,
            destinationChain,
            recipient,
            amount,
            metadata,
            gasValue
        );
    }

    /**
     * @notice Implementation of the interchainTransferFrom method
     * @dev We chose to either pass `metadata` as raw data on a remote contract call, or, if no data is passed, just do a transfer.
     * A different implementation could use metadata to specify a function to invoke, or for other purposes as well.
     * @param tokenId The unique identifier of the token to be transferred.
     * @param sender The sender of the tokens. They need to have approved `msg.sender` before this is called.
     * @param destinationChain The string representation of the destination chain.
     * @param recipient The bytes representation of the address of the recipient.
     * @param amount The amount of token to be transferred.
     * @param metadata Optional metadata for the call for additional effects (such as calling a destination contract.)
     */
    function interchainTransferFrom(
        bytes tokenId,
        address sender,
        string calldata destinationChain,
        bytes calldata recipient,
        uint256 amount,
        bytes calldata metadata
    ) external payable {
        uint256 _allowance = allowance(sender, msg.sender);

        if (_allowance != type(uint256).max) {
            _approve(sender, msg.sender, _allowance - amount);
        }

        service.transmitInterchainTransfer{ value: msg.value}(
            tokenId,
            destinationChain,
            recipient,
            amount,
            metadata,
            gasValue
        );
    }
}

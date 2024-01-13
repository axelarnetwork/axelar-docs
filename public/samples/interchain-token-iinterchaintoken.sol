// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ITokenManager} from "@axelar-network/interchain-token-service/contracts/interfaces/ITokenManager.sol";
import {ITokenManagerType} from "@axelar-network/interchain-token-service/contracts/interfaces/ITokenManagerType.sol";
import {IInterchainToken} from "@axelar-network/interchain-token-service/contracts/interfaces/IInterchainToken.sol";
import {IInterchainTokenService} from "@axelar-network/interchain-token-service/contracts/interfaces/IInterchainTokenService.sol";
import {AddressBytes} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/libs/AddressBytes.sol";

/**
 * This is sample code only and has not been audited.
 * Use this for learning, but verify the functionality
 * and security of your smart contracts before using
 * in production.
 */
contract MyInterchainToken is ERC20, AccessControl {
    using AddressBytes for address;

    address public creator;
    bytes32 public tokenId;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    ITokenManager public tokenManager;
    IInterchainTokenService public service =
        IInterchainTokenService(0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C);

    constructor() ERC20("MyInterchainToken", "MITKN") {
        // Mint 1,000 tokens to the creator
        creator = msg.sender;
        _mint(creator, 1000 * 10**18);
        _grantRole(MINTER_ROLE, msg.sender);

        // Register this token (could also be done 1-time smart contract invocation)
        // Not a good practice because it can't go to non-EVM chains
        deployTokenManager("");
    }

    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyRole(MINTER_ROLE) {
        _burn(from, amount);
    }

    function deployTokenManager(bytes32 salt) internal {
        require(msg.value > 0, "Gas payment is required");

        bytes memory params = tokenManager.params(
            msg.sender.toBytes(),
            address(this)
        );

        service.deployTokenManager(
            salt,
            "", // This field remains empty if the token manager is deployed on the local chain; however, you need to specify it when deploying on a remote chain.
            ITokenManagerType.TokenManagerType.MINT_BURN,
            params,
            msg.value // gasValue
        );

        tokenId = service.interchainTokenId(
            msg.sender,
            salt
        );
    }

    function myCustomFunction() public {
        // Just an example custom feature
        // Give owner 1,000 more
        _mint(creator, 1000 * 10**18);
    }

    function transferMintership(address newMinter) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        
        _revokeRole(MINTER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, newMinter);
    }

    /**
     * @notice Implementation of the interchainTransfer method.
     * @dev We chose to either pass `metadata` as raw data on a remote contract call, or if no data is passed, just do a transfer.
     * A different implementation could use metadata to specify a function to invoke, or for other purposes as well.
     * @param destinationChain The destination chain identifier.
     * @param recipient The bytes representation of the address of the recipient.
     * @param amount The amount of token to be transferred.
     * @param metadata Optional metadata for the call for additional effects (such as calling a destination contract).
     */
    function interchainTransfer(
        string calldata destinationChain,
        bytes calldata recipient,
        uint256 amount,
        bytes calldata metadata
    ) external payable {

        service.transmitInterchainTransfer{ value: msg.value }(
            tokenId,
            address(this),
            destinationChain,
            recipient,
            amount,
            metadata
        );
    }

    /**
     * @notice Implementation of the interchainTransferFrom method
     * @dev We chose to either pass `metadata` as raw data on a remote contract call, or, if no data is passed, just do a transfer.
     * A different implementation could use metadata to specify a function to invoke, or for other purposes as well.
     * @param sender The sender of the tokens. They need to have approved `msg.sender` before this is called.
     * @param destinationChain The string representation of the destination chain.
     * @param recipient The bytes representation of the address of the recipient.
     * @param amount The amount of token to be transferred.
     * @param metadata Optional metadata for the call for additional effects (such as calling a destination contract.)
     */
    function interchainTransferFrom(
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

       service.transmitInterchainTransfer{ value: msg.value }(
            tokenId,
            address(this),
            destinationChain,
            recipient,
            amount,
            metadata
        );
    }
}

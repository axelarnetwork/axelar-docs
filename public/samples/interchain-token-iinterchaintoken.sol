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
        IInterchainTokenService(0xF786e21509A9D50a9aFD033B5940A2b7D872C208);

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
        bytes memory params = service.getParamsMintBurn(
            msg.sender.toBytes(),
            address(this)
        );
        bytes32 tokenId = service.deployCustomTokenManager(
            salt,
            ITokenManagerType.TokenManagerType.MINT_BURN,
            params
        );
        tokenManager = ITokenManager(service.getTokenManagerAddress(tokenId));
        transferOwnership(address(tokenManager));
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

    /**
     * @notice Implementation of the interchainTransfer method
     * @dev We chose to either pass `metadata` as raw data on a remote contract call, or, if no data is passed, just do a transfer.
     * A different implementation could have `metadata` that tells this function which function to use or that it is used for anything else as well.
     * @param destinationChain The destination chain identifier.
     * @param recipient The bytes representation of the address of the recipient.
     * @param amount The amount of token to be transfered.
     * @param metadata Either empty, to just facilitate an interchain transfer, or the data can be passed for an interchain contract call with transfer as per semantics defined by the token service.
     */
    function interchainTransfer(
        string calldata destinationChain,
        bytes calldata recipient,
        uint256 amount,
        bytes calldata metadata
    ) external payable {
        address sender = msg.sender;

        // Metadata semantics are defined by the token service and thus should be passed as-is.
        tokenManager.transmitInterchainTransfer{value: msg.value}(
            sender,
            destinationChain,
            recipient,
            amount,
            metadata
        );
    }

    /**
     * @notice Implementation of the interchainTransferFrom method
     * @dev We chose to either pass `metadata` as raw data on a remote contract call, or, if no data is passed, just do a transfer.
     * A different implementation could have `metadata` that tells this function which function to use or that it is used for anything else as well.
     * @param sender the sender of the tokens. They need to have approved `msg.sender` before this is called.
     * @param destinationChain the string representation of the destination chain.
     * @param recipient the bytes representation of the address of the recipient.
     * @param amount the amount of token to be transfered.
     * @param metadata either empty, to just facilitate a cross-chain transfer, or the data to be passed to a cross-chain contract call and transfer.
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

        tokenManager.transmitInterchainTransfer{value: msg.value}(
            sender,
            destinationChain,
            recipient,
            amount,
            metadata
        );
    }
}

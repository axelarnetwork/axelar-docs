// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// more suited than OZ ERC20 for proxying because it doesn't require constructor parameters
import {ERC20} from "@axelar-network/interchain-token-service/contracts/token-implementations/ERC20.sol";

import {IERC20BurnableMintable} from "@axelar-network/interchain-token-service/interfaces/IERC20BurnableMintable.sol";
import {Distributable} from "@axelar-network/interchain-token-service/utils/Distributable.sol";
import {AddressBytesUtils} from "@axelar-network/libraries/AddressBytesUtils.sol";
import {ITokenManagerType} from "@axelar-network/interfaces/ITokenManagerType.sol";
import {IInterchainTokenService} from "@axelar-network/interchain-token-service/contracts/interfaces/IInterchainTokenService.sol";

/**
 * This is sample code only and has not been audited.
 * Use this for learning, but verify the functionality
 * and security of your smart contracts before using
 * in production.
 */
contract CustomERC20 is
    ERC20,
    IERC20BurnableMintable,
    Distributable,
    ITokenManagerType
{
    string public name;
    string public symbol;
    uint8 public decimals;
    address public creator;

    IInterchainTokenService public immutable service =
        IInterchainTokenService(0x37ED6be138653B3029c3c6c2Aa7e8B7DcD372A11);

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        address distributor,
        uint256 mintAmount
    ) {
        name = name_;
        symbol = symbol_;
        decimals = decimals_;
        _setDistributor(distributor);
        creator = msg.sender;
        _mint(creator, mintAmount);

        deployTokenManager("");
    }

      function myCustomFunction() public {
        // Just an example custom feature
        // Give owner 1,000 more
        _mint(creator, 1000 * 10**18);
    }

    function deployTokenManager(bytes32 salt) external {
        bytes memory params = service.getParamsMintBurn(address(msg.sender).toBytes(), tokenAddress);
        bytes32 tokenId = service.deployCustomTokenManager(salt, TokenManagerType.MINT_BURN, params);
        address tokenManager = service.getTokenManagerAddress(tokenId);
        CustomERC20(tokenAddress).setDistributor(tokenManager);
    }

    function mint(address to, uint256 amount) external onlyDistributor {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyDistributor {
        _burn(from, amount);
    }

    // No local send function
    // call sendToken on the tokenManager instead
}

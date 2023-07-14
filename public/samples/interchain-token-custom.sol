// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC20 } from '@axelar-network/interchain-token-service/contracts/token-implementations/ERC20.sol';
import { IERC20BurnableMintable } from '../interfaces/IERC20BurnableMintable.sol';
import { Distributable } from '../utils/Distributable.sol';

contract CustomERC20 is ERC20, IERC20BurnableMintable, Distributable {
    string public name;
    string public symbol;
    uint8 public decimals;

    constructor(string memory name_, string memory symbol_, uint8 decimals_, address distributor, uint256 mintAmount) {
        name = name_;
        symbol = symbol_;
        decimals = decimals_;
        _setDistributor(distributor);
        _mint(msg.sender, mintAmount);
    }

    function mint(address to, uint256 amount) external onlyDistributor {
        _mint(to, amount);
    }
    
    function burn(address from, uint256 amount) external onlyDistributor {
        _burn(from, amount);
    }
}
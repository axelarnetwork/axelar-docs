// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "IInterchainTokenLinker.sol";


contract InterchainToken is ERC20 {
    bytes32 public tokenId;

    constructor() ERC20("MyInterchainToken", "MITKN") {
        _mint(msg.sender, 1000 * 10 ** 18);
        _mint(address(this), 1000 * 10 ** 18);
    }

    // This should be permissioned in a real implementation
    function setTokenId(bytes32 _tokenId) external {
        tokenId = _tokenId;
    }

    function sendInterchain(string calldata destinationChain, bytes calldata to, uint256 amount) payable external {
        if (tokenId == 0) {
            revert(
                "No tokenID set, please configure the interchain token first."
            );
        }
        if (msg.value == 0) {
            revert("Sending interchain requires a native gas payment.");
        }
        address linkerAddress = 0x7cD2E96f5258BB825ad6FC0D200EDf8C99590d30;
        _approve(address(this),linkerAddress, amount);
        IInterchainTokenLinker linker = IInterchainTokenLinker(
            linkerAddress
        );
        linker.sendToken{value: msg.value}(
            tokenId,
            destinationChain,
            to,
            amount
        );
    }
}

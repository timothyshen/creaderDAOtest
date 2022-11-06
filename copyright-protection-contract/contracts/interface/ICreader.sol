// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ICreader is IERC20 {
    /**
     * @dev the interface of the Creader token
     */
    function mint(address to, uint256 amount) external;

    function burn(address from, uint256 amount) external;

    function burnFrom(address from, uint256 amount) external;

    function transfer(address recipient, uint256 amount) override external returns (bool);
}

// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import './AccessToken.sol';

contract NFTFactory {

    mapping(address => AccessToken) public accessCollections;



    function CopyrightDeploy(address copyright, string memory baseURI, string memory name, string memory symbol) external{
        require(accessCollections[msg.sender] == AccessToken(msg.sender), "Only one collection per book");
        accessCollections[msg.sender] = new AccessToken(copyright, baseURI, name, symbol);
    }
}

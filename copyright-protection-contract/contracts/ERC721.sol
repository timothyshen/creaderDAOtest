//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract MirrorClone is ERC721, ERC721Enumerable, ERC721URIStorage {
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter _tokenIds;

    mapping(string => uint256) public tokenURIToTokenId;

    event TokenMinted(address indexed owner, uint256 indexed tokenId, string indexed tokenURI);

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function createToken(string memory _tokenURI) public returns (uint) {
        // require statement to check if _tokenURI is not empty
        require(bytes(_tokenURI).length > 0, "Empty tokenURI");
        // Increment counter so it starts with 0
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        // Mint token
        _safeMint(msg.sender, newItemId);
        // Set token URI
        _setTokenURI(newItemId, _tokenURI);
        // Set tokenURIToTokenId
        tokenURIToTokenId[_tokenURI] = newItemId;
        // Emit TokenMinted event
        emit TokenMinted(msg.sender, newItemId, _tokenURI);
        // Return new tokenId
        return newItemId;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
/**
 * @title SampleERC721
 * @dev Create a sample ERC721 standard token
 */
contract NewCopyright is ERC721 {
    using Strings for string;

    //Struct
    struct Cover {
        string title;
        string description;
        address owner;
        string status;
    }

    // URI
    string internal baseURI;

    // mutable storage
    mapping(uint256 => Cover) public covers;

    mapping(uint256 => uint256) public tokenToCover;

    uint256 private nextTokenId;

    uint256 private nextCoverId = 1;

    event CoverCreation(
        string title,
        string description,
        address owner,
        string status,
        uint256 indexed CoverId
    );

    event CoverUpdate(
        uint256 indexed CoverId,
        string title,
        string description,
        string status
    );

    event CoverMint(
        uint256 indexed CoverId,
        uint256 indexed tokenId,
        address indexed author
    );

    constructor(string memory baseURI_, string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        baseURI = baseURI_;
    }

    modifier onlyOwner(uint256 _id) {
        require(covers[_id].owner == msg.sender, "Caller is not the owner");
        _;
    }

    function createCopyright(
        string memory _title,
        string memory _description,
        string memory _status
    ) external {
        uint256 _coverId = nextCoverId;
        covers[_coverId] = Cover({
        title: _title,
        description: _description,
        owner: msg.sender,
        status: _status
        });

        emit CoverCreation(_title, _description, msg.sender, _status, _coverId);

        mintCopyright(_coverId++);

        nextCoverId = _coverId;
    }

    function mintCopyright(uint256 coverId) public returns (uint) {
        // Check that the Cover exists.
        require(bytes(covers[coverId].title).length > 0, "Cover does not exist");

        // Mint a new token for the sender, using the `nextTokenId`.
        _mint(msg.sender, nextTokenId);
        // Store the mapping of token id to the Copyright being purchased.
        tokenToCover[nextTokenId] = coverId;

        emit CoverMint(
            coverId,
            nextTokenId,
            msg.sender
        );

        nextTokenId++;
        return nextTokenId;
    }

    function updateCover(uint256 _id, string memory _title, string memory _description) external onlyOwner(_id) returns (uint256)  {
        Cover storage cover = covers[_id];
        cover.title = _title;
        cover.description = _description;
        emit CoverUpdate(_id, _title, _description, "active");
        return _id;
    }

    // Returns e.g. https://creader.io/Copyright/[CopyrightId]/[tokenId]
    function tokenURI(uint256 tokenId)
    public
    view
    override
    returns (string memory)
    {
        // If the token does not map to an Copyright, it'll be 0.
        require(tokenToCover[tokenId] > 0, "Token has not been sold yet");
        // Concatenate the components, baseURI, Copyright and tokenId, to create URI.
        return
        string(
            abi.encodePacked(
                baseURI,
                Strings.toString(tokenToCover[tokenId]),
                "/",
                Strings.toString(tokenId)
            )
        );
    }

    // Returns e.g. https://mirror-api.com/Copyright/metadata
    function contractURI() public view returns (string memory) {
        // Concatenate the components, baseURI, CopyrightId and tokenId, to create URI.
        return string(abi.encodePacked(baseURI, "metadata"));
    }

}

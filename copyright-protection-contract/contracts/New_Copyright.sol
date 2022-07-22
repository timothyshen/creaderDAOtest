// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title SampleERC721
 * @dev Create a sample ERC721 standard token
 */
contract NewCopyright is ERC721 {


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

    event EditionPurchased(
        uint256 indexed CoverId,
        uint256 indexed tokenId,
    // The account that paid for and received the NFT.
        address indexed author
    );

    constructor(string memory baseURI_, string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        baseURI = baseURI_;
    }

    function createCopyright(
        string memory _title,
        string memory _description,
        string memory _status
    ) external {

        covers[nextCoverId] = Cover({
        title: _title,
        description: _description,
        owner: msg.sender,
        status: _status
        });

        emit CoverCreation(_title, _description, msg.sender, _status, nextCoverId);

        mintCopyright(nextCoverId);

        nextCoverId++;
    }

    function mintCopyright(uint256 coverId) public returns (uint) {
        // Check that the Cover exists.
        require(bytes(covers[coverId].title).length > 0, "Cover does not exist");

        // Increment the number of tokens sold for this edition.
        // covers[coverId].numSold++;
        // Mint a new token for the sender, using the `nextTokenId`.
        _mint(msg.sender, nextTokenId);
        // Store the mapping of token id to the edition being purchased.
        tokenToCover[nextTokenId] = coverId;

        emit EditionPurchased(
            coverId,
            nextTokenId,
            msg.sender
        );

        nextTokenId++;
        return nextTokenId;
    }

    // Returns e.g. https://mirror-api.com/editions/[editionId]/[tokenId]
    function tokenURI(uint256 tokenId)
    public
    view
    override
    returns (string memory)
    {
        // If the token does not map to an edition, it'll be 0.
        require(tokenToCover[tokenId] > 0, "Token has not been sold yet");
        // Concatenate the components, baseURI, editionId and tokenId, to create URI.
        return
        string(
            abi.encodePacked(
                baseURI,
                _toString(tokenToCover[tokenId]),
                "/",
                _toString(tokenId)
            )
        );
    }

    // Returns e.g. https://mirror-api.com/editions/metadata
    function contractURI() public view returns (string memory) {
        // Concatenate the components, baseURI, editionId and tokenId, to create URI.
        return string(abi.encodePacked(baseURI, "metadata"));
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

}

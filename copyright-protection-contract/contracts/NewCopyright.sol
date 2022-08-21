// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "hardhat/console.sol";
/**
 * @title SampleERC721
 * @dev Create a sample ERC721 standard token
 */
contract NewCopyright is ERC721URIStorage {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter public _coverIds;

    //Struct
    struct Cover {
        uint256 id;
        string title;
        string description;
        string status;
        address owner;
    }

    // URI
    string internal baseURI;

    // mutable storage
    mapping(uint256 => Cover) public covers;

    mapping(uint256 => uint256) public tokenToCover;

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
        require(bytes(_title).length > 0, "Title must be non-empty");
        require(bytes(_description).length > 0, "Description must be non-empty");
        require(bytes(_status).length > 0, "Status must be non-empty");
        uint256 newCoverId = _coverIds.current();
        _coverIds.increment();
        covers[newCoverId] = Cover({
        id : newCoverId,
        title : _title,
        description : _description,
        owner : msg.sender,
        status : _status
        });

        emit CoverCreation(_title, _description, msg.sender, _status, newCoverId);

        mintCopyright(newCoverId);
    }

    function mintCopyright(uint256 coverId) public {
        // Check that the Cover exists.
        require(bytes(covers[coverId].title).length > 0, "Cover does not exist");
        require(covers[coverId].owner == msg.sender, "Caller is not the owner");
        require(!_exists(coverId), "Token does exist");
        uint256 newItemId = _tokenIds.current();
        _tokenIds.increment();

        // Mint a new token for the sender, using the `newItemId`.
        _safeMint(msg.sender, newItemId);
        // Store the mapping of token id to the Copyright being purchased.
        tokenToCover[newItemId] = coverId;

        emit CoverMint(
            coverId,
            newItemId,
            msg.sender
        );

        _setTokenURI(newItemId, getTokenURI(newItemId));
    }


    function updateCover(uint256 _id, string memory _title, string memory _description) external onlyOwner(_id) returns (uint256)  {
        Cover storage cover = covers[_id];
        cover.title = _title;
        cover.description = _description;
        emit CoverUpdate(_id, _title, _description, "active");
        return _id;
    }

    function getAllCoypright() public view returns (Cover[] memory) {
        uint coverId = _coverIds.current();
        Cover[] memory result = new Cover[](coverId);
        for (uint256 i = 0; i < coverId; i++) {
            result[i] = covers[i];
        }
        return result;
    }

    function getCover(uint256 _id) public view returns (Cover memory) {
        return covers[_id];
    }

    function getCoverByToken(uint256 tokenId) public view returns (Cover memory) {
        return covers[tokenToCover[tokenId]];
    }

    function getTitleByToken(uint tokenId) public view returns (string memory) {
        return covers[tokenToCover[tokenId]].title;
    }

    function getAuthor(uint _id) public view returns (address ) {
        return covers[_id].owner;
    }
    function getTitle(uint _id) public view returns (string memory) {
        return covers[_id].title;
    }
    function getAuthorString() public view returns (string memory) {
        return Strings.toHexString(uint256(uint160(msg.sender)), 20);
    }

    function getAuthorCover() external view returns (Cover[] memory){
        uint256 resultCount;
        for (uint256 i = 0; i < _coverIds.current(); i++) {
            if (covers[i].owner == msg.sender) {
                resultCount++;
            }
        }
        console.log(resultCount);
        Cover[] memory result = new Cover[](resultCount);
        uint j;
        for (uint256 i = 0; i < _coverIds.current(); i++) {
            if (covers[i].owner == msg.sender) {
                result[j] = covers[i];
                console.log(result[j].title);
                j++;
            }
        }
        return result;
    }


    // ############## Token URI Function###############

    function generateCoverImage(uint256 tokenId) public view returns (string memory) {
        bytes memory coverImage = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            '<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>',
            '<rect width="100%" height="100%" fill="black" />',
            '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">',"Title: ",getTitleByToken(tokenId),'</text>',
            '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">', "Author: ",getAuthorString(),'</text>',
            '</svg>'
        );
        return string(
            abi.encodePacked(
                "data:image/svg+xml;base64,",
                Base64.encode(coverImage)
            )
        );
    }

    //    function getSVGToImageURI(string memory svg) public returns (string memory) {
    //        string memory baseURL = "data:image/svg+xml;base64,";
    //        string memory svgBase64Encoded = Base64.encode(bytes(abi.encodePacked(svg)));
    //        string memory imageURI = abi.encodePacked(baseURI, svgBase64Encoded)
    //        return imageURI;
    //    }


    function getTokenURI(uint tokenId) public view returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            '{',
            '"name": "CreaderDAO Copyright ', getTitleByToken(tokenId), ' #', tokenId.toString(), '",',
            '"description": "Creader Copyright is a Unique NFT built based on the ERC721 standard to represent the ownership of the book. We want to use this token to help pushing the use of NFT in copyright and IP law",',
            '"image": "', generateCoverImage(tokenId), '"',
            '}'
        );
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }
}

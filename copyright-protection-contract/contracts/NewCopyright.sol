// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title SampleERC721
 * @dev Create a sample ERC721 standard token
 */
contract NewCopyright is ERC721URIStorage {
    using Strings for string;

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

    uint256 private nextTokenId = 1;

    uint256 public nextCoverId = 1;

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

        uint256 _coverId = nextCoverId;

        covers[_coverId] = Cover({
        id: _coverId,
        title: _title,
        description: _description,
        owner: msg.sender,
        status: _status
        });

        emit CoverCreation(_title, _description, msg.sender, _status, _coverId);

        mintCopyright(_coverId);

        _coverId++;

        nextCoverId = _coverId;
    }

    function mintCopyright(uint256 coverId) public  {
        // Check that the Cover exists.
        require(bytes(covers[coverId].title).length > 0, "Cover does not exist");
        require(covers[coverId].owner == msg.sender, "Caller is not the owner");
        require(nextTokenId > tokenToCover[coverId], "Cover NFT exists");


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
    }


    function updateCover(uint256 _id, string memory _title, string memory _description) external onlyOwner(_id) returns (uint256)  {
        Cover storage cover = covers[_id];
        cover.title = _title;
        cover.description = _description;
        emit CoverUpdate(_id, _title, _description, "active");
        return _id;
    }

    function getAllCoypright() public view returns (Cover[] memory) {
        Cover[] memory result = new Cover[](nextCoverId);
        for (uint256 i = 0; i < nextCoverId; i++) {
            result[i] = covers[i];
        }
        return result;
    }

    function getCover(uint256 _id) public view returns (Cover memory) {
        return covers[_id];
    }

    function getCoverByToken(uint256 _tokenId) public view returns (Cover memory) {
        return covers[tokenToCover[_tokenId]];
    }

    function getAuthorCover() external view returns (Cover[] memory){
        uint256 resultCount;
        for (uint256 i = 0; i < nextCoverId; i++) {
            if (covers[i].owner == msg.sender) {
                resultCount++;
            }
        }
        Cover[] memory result = new Cover[](resultCount);
        uint j;
        for (uint256 i = 0; i < nextCoverId; i++) {
            if (covers[i].owner == msg.sender) {
                result[j] = covers[i];
                j++;
            }
        }
        return result;
    }

    function fetchUserNFT() public view returns (Cover[] memory) {
        uint totalNFTCount = nextTokenId;
        uint itemCount = 0;
        uint currentIndex = 0;
        for (uint256 i = 0; i < totalNFTCount; i++) {
            if (covers[tokenToCover[i]].owner == msg.sender) {
                itemCount++;
            }
        }
        Cover[] memory result = new Cover[](itemCount);
        for (uint256 i = 0; i < totalNFTCount; i++) {
            if (covers[tokenToCover[i]].owner == msg.sender) {
                result[currentIndex] = covers[tokenToCover[i]];
                currentIndex++;
            }
        }
        return result;
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

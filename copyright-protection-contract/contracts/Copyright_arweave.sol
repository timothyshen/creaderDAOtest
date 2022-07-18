//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Copyright_arweave {
    // copyright is a string of bytes, unqiuely assigned to each cover
    string public copyright_id;



    // Cover is a struct that contains the title, description, and address of the cover
    // Representing a cover in the book(cover) also the data for NFT
    struct Cover {
        uint256 id;
        string title;
        string description;
        address owner;
        string status;

        string[] chapters;
    }


    mapping(uint256 => Cover) public covers;

    uint256 public numCovers;
    uint256 public numChapters;

    // modifier
    modifier onlyOwner(uint256 _id) {
        require(covers[_id].owner == msg.sender);
        _;
    }

    // create a new cover
    // @param _title: string - title of the cover
    // @param _description: string - description of the cover
    // @param _owner: address - address of the owner of the cover
    // @returns uint256 - id of the cover
    function createCopyright(string memory _title, string memory _description) external returns (uint256) {
        Cover storage cover = covers[numCovers];
        cover.id = numCovers;
        cover.title = _title;
        cover.description = _description;
        cover.owner = msg.sender;
        numCovers++;
        return numCovers - 1;
    }

    // create a new chapter
    // @param _title: string - title of the chapter
    // @param _context: string - context of the chapter
    // @param _cover: uint256 - id of the cover
    // @returns uint256 - id of the chapter
    function createChapter(uint256 _coverId, string calldata _chapterId) external onlyOwner(_coverId) returns (uint256) {
        Cover storage cover = covers[_coverId];
        cover.chapters.push(_chapterId);
        numChapters++;
        return numChapters - 1;
    }

    function getAllCoypright() public view returns (Cover[] memory) {
        Cover[] memory result = new Cover[](numCovers);
        for (uint256 i = 0; i < numCovers; i++) {
            result[i] = covers[i];
        }
        return result;
    }

    // get the cover by id
    // @param _id: uint256 - id of the cover
    // @returns Cover - cover with the id
    function getCopyright(uint256 _id) external view returns (string memory, string memory, address, uint256, address, string memory, string[] memory) {
        Cover storage cover = covers[_id];
        return (cover.title, cover.description, cover.owner, block.timestamp, block.coinbase, cover.status, cover.chapters);
    }

    // get all the covers for specific user
    function getAuthorCover() external view returns (Cover[] memory){
        uint256 resultCount;
        for (uint256 i = 0; i < numCovers; i++) {
            if (covers[i].owner == msg.sender) {
                resultCount++;
            }
        }
        Cover[] memory result = new Cover[](resultCount);
        uint j;
        for (uint256 i = 0; i < numCovers; i++) {
            if (covers[i].owner == msg.sender) {
                result[j] = covers[i];
                j++;
            }
        }
        return result;
    }

    // update the information of a cover
    // @param _id: uint256 - id of the cover
    // @param _title: string - title of the cover
    // @param _description: string - description of the cover
    // @returns uint - id of the cover
    function updateCover(uint256 _id, string memory _title, string memory _description) external onlyOwner(_id) returns (uint256)  {
        Cover storage cover = covers[_id];
        cover.title = _title;
        cover.description = _description;
        return _id;
    }
}

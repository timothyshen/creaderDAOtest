// SPXD-License-Identifier: MIT

pragma solidity >=0.8.13;
import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";




contract Copyright {

    struct novel{
        address author;
        string title;
        string imageHash;
        string shortDescription;
        string longDescription;
        uint256 timestamp;
        uint viewCount;
        uint likeCount;
        uint commentCount;
        uint rating;
    }

    novel[] public novelList;

    uint public novelCount;
    mapping(uint => novel) public novelMap;


    event novelCreated(address indexed author, string title, string imageHash, string shortDescription, string longDescription, uint256 timestamp, uint viewCount, uint likeCount, uint commentCount, uint rating);

    modifier onlyAuthor(uint _index) {
        require(msg.sender == novelList[_index].author);
        _;
    }


    function createNovel(string memory title, string memory imageHash, string memory shortDescription, string memory longDescription) public {
        uint viewCount = 0;
        uint likeCount = 0;
        uint commentCount = 0;
        uint rating = 0;
        novelList.push(novel(msg.sender, title, imageHash, shortDescription, longDescription, block.timestamp, 0, 0, 0, 0));
        novelCount += 1;
        emit novelCreated(msg.sender, title, imageHash, shortDescription, longDescription, block.timestamp, viewCount, likeCount, commentCount, rating);
    }



    function getAuthorNovels() public view returns(novel[] memory) {
        novel[] memory authorNovelList = new novel[](novelCount);
        uint count;
        for (uint i = 0; i < novelCount; i++) {
            if (novelList[i].author == msg.sender) {
                authorNovelList[count] = novelList[i];
                count += 1;
            }
        }

        return authorNovelList;
    }

    function getAllNovel() public view returns (novel[] memory){
        return novelList;
    }

    function updateTitle(uint256 index, string calldata title) public onlyAuthor(index) {
        require(bytes(title).length > 0, "Title cannot be empty");
        novelList[index].title = title;
    }

    function updateShortDescription(uint256 index, string memory shortDescription) public onlyAuthor(index) {
        require(bytes(shortDescription).length > 0, "Short description cannot be empty");
        novelList[index].shortDescription = shortDescription;
    }

    function updateLongDescription(uint256 index, string memory longDescription) public onlyAuthor(index) {
        require(bytes(longDescription).length > 0, "Long description cannot be empty");
        novelList[index].longDescription = longDescription;
    }
}

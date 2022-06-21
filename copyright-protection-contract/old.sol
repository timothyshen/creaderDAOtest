// SPXD-License-Identifier: MIT

pragma solidity >=0.8.13;

import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract CoverList {
    using SafeMath for uint;
    address[] public covers;

    function addCover(string _title, string _description) public {
        address newCover = new Cover(_title, _description, msg.sender);
        covers.push(newCover);
    }

    function getCovers() public view returns (address[]) {
        return covers;
    }

}

contract Cover {
    using SafeMath for uint;

    struct Chapter {
        string title;
        string context;
        address cover;
    }

    address public owner;
    string public title;
    string public description;
    Chapter[] public chapters;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor(string _title, string _description, address _owner) public {
        require(_title.length > 0);
        require(_description.length > 0);
        owner = _owner;
        title = _title;
        description = _description;
    }

    function addChapter(string _title, string _context, address _cover) onlyOwner public {
        Chapter memory newChapter = Chapter({
            title : _title,
            context : _context,
            cover : _cover
        });

        chapters.push(newChapter);
    }

    function getChapters() public view returns (Chapter[]) {
        return chapters;
    }
}

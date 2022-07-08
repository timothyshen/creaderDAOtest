//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Copyright {

    string public copyright_id;

    struct Cover {
        uint256 id;
        string title;
        string description;
        address owner;
        string status;

        Chapter[] chapters;
    }

    struct Chapter {
        uint256 id;
        string title;
        string context;
        string status;
    }

    Cover[] covers;

    Chapter[] chapters;

    uint256 public numCovers;
    uint256 public numChapters;

    modifier onlyOwner {
        require(msg.sender == Cover(this).owner);
        _;
    }

    function createCopyright(string memory _title, string memory _description) external returns (uint256) {
        covers.push(Cover(numCovers, _title, _description, msg.sender));
        numCovers++;
        return numCovers - 1;
    }

    function createChapter(uint256 _coverId, string memory _title, string memory _context) external onlyOwner returns (uint256) {
        Chapter memory newChapter = Chapter({
            id : numChapters,
            title : _title,
            context : _context,
            status : "active"
        });
        Cover(this).chapters.push(newChapter);
        chapters.push(newChapter);
        numChapters++;
        return numChapters - 1;
    }

    function getCopyright(uint256 _id) external view returns (string memory, string memory, address, uint256, address) {
        Cover storage cover = covers[_id];
        return (cover.title, cover.description, cover.owner, block.timestamp, block.coinbase, cover.status, cover.chapters);
    }

    function getChapter(uint256 _id) external view returns (string memory, string memory, address, uint256, address) {
        Chapter storage chapter = chapters[_id];
        return (chapter.title, chapter.context, chapter.owner, block.timestamp, block.coinbase);
    }

    function getChapters(uint256 _coverId) external view returns (Chapter[]) {
        return Cover(this).chapters;
    }

    function getAllcover() external view returns (Cover[] memory) {
        return covers;
    }

    function getCoverOwner(address _owner) external view returns (Cover[]) {
        Cover[] storage authorCover = new Cover[](0);
        for (uint256 i = 0; i < numCovers; i++) {
            Cover storage cover = covers[i];
            if (cover.owner == _owner) {
                authorCover.push(cover);
            }
        }
        return authorCover;
    }

    function updateChapter(uint256 _id, string memory _title, string memory _context) external onlyOwner returns (uint256) {
        Chapter storage chapter = chapters[_id];
        chapter.title = _title;
        chapter.context = _context;
        return _id;
    }

    function updateCover(uint256 _id, string memory _title, string memory _description) external onlyOwner returns (uint256) {
        Cover storage cover = covers[_id];
        cover.title = _title;
        cover.description = _description;
        return _id;
    }
}

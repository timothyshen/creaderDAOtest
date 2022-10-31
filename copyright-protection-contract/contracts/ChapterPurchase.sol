pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interface/ICreader.sol";

contract ChapterPurchase {

    address private tokenAddress;

    event Purchase(address indexed buyer, address indexed chapterId, uint256 amount);

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    modifier onlyToken() {
        require(msg.sender == tokenAddress, "ERR:NT"); //NT => Not Token
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "ERR:NA"); //NA => Not Admin
        _;
    }

    function setTokenAddress(address _tokenAddress) public {
        tokenAddress = _tokenAddress;
    }

    function ChapterPurchase(address author, address chapter, uint256 amount) public onlyToken{
        ICreader(tokenAddress).transferFrom(author, msg.sender, amount);
        emit Purchase(msg.sender, chapter, amount);
    }

    function verifyChapterPurchase(address author, uint256 amount) public view returns (bool) {
        return ICreader(tokenAddress).allowance(author, msg.sender) == amount;
    }
}

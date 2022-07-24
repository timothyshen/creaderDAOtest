//SPDX-Licence-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DFlix is ERC1155, Ownable {

    using SafeMath for uint256;

    struct plan {
        string name;
        string uri;
        uint256 subscribers;
        uint256 price;
        uint time;
    }

    struct subscriber {
        uint256 plan;
        uint256 date;
    }

    mapping(uint256 => plan) internal plans;

    mapping(address => subscriber) internal subscribers;

    uint256 public totalPlans;

    constructor(string memory name, string memory symbol, string memory uri) ERC1155(uri) {}


    modifier correctId(uint id) {
        require(id <= totalPlans && id>0, "provide a correct planID");
        _;
    }

    function setURI(string memory uri) external onlyOwner {
        _setURI(uri);
    }



    function ifExpired(uint id) internal view returns(bool) {
        if(subscribers[msg.sender].plan == id) {
            if((block.timestamp).sub(subscribers[msg.sender].date) < plans[id].time) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    function addPlan(string memory _name, string memory uri, uint256 price, uint time) external onlyOwner {
        totalPlans = totalPlans.add(1);
        uint256 id = totalPlans.add(1);
        plans[id] = plan(_name, uri, 0, price, time);
    }

    function updatePlan(uint id, string memory _name, string memory uri, uint256 price, uint time) external onlyOwner {
        plans[id] = plan(_name, uri, plans[id].subscribers, price, time);
    }

    function subscribe(uint256 planId) external correctId(planId) payable {
        require(ifExpired(planId) == true, "your current plan hasn't expired yet");
        require(msg.value == plans[planId].price, "please send correct amount of ether");
        plans[planId].subscribers = (plans[planId].subscribers).add(1);
        subscribers[msg.sender] = subscriber(planId, block.timestamp);
        _burn(msg.sender, subscribers[msg.sender].plan, balanceOf(msg.sender, subscribers[msg.sender].plan));
        plans[subscribers[msg.sender].plan].subscribers = (plans[subscribers[msg.sender].plan].subscribers).sub(balanceOf(msg.sender, subscribers[msg.sender].plan));
        _mint(msg.sender, planId, 1, "");
        payable(msg.sender).transfer(msg.value);
    }

    function currentPlan(address user) public view returns(uint) {
        require((block.timestamp).sub(subscribers[msg.sender].date) < plans[subscribers[msg.sender].plan].time, "deosn't have any active plan");
        return subscribers[user].plan;
    }

    function tokenURI(uint id) public correctId(id) view returns(string memory) {
        return plans[id].uri;
    }

    function tokenSupply(uint id) public correctId(id) view returns(uint) {
        return plans[id].subscribers;
    }

    function tokenPrice(uint id) public correctId(id) view returns(uint) {
        return plans[id].price;
    }


    function totalSupply() public view returns(uint) {
        return totalPlans;
    }

    function balance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }

    function withdraw(uint256 amount) external onlyOwner {
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "transfer failed");
    }


}

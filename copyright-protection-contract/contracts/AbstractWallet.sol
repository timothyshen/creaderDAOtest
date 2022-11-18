pragma solidity ^0.8.0;

import "";



contract AbstractWallet {


    // struct
    struct Recovery{

    }

    // variable

    // arrays

    // mappings

    // events

    // modifier

    // function
    function addFund() external payable{
    }

    function withDrawAll() external{
        payable(address(msg.sender)).transfer(address(this).balance);
    }

    function totalAmount() external returns(uint){
        return address(this).balance;
    }

    function TokenTotal() external view returns(uint){
        return token.balanceOf(address(this));
    }

    function withdrawAllToken() externel {
        token.transferForm(address(this), msg.sender, TokenTotal());
    }

    function getToken(uint256 _amount) external {
        token.transfer(address(this), _amount);
    }

    function sendTokens(address _recipent,)
}

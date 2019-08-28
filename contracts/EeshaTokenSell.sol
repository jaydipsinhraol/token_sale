pragma solidity ^0.5.0;
import "./EeshaToken.sol";

contract EeshaTokenSale {
    address payable admin;
    EeshaToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);

    constructor(EeshaToken _tokenContract, uint256 _tokenPrice) public{
        // assign an admin
        admin = msg.sender;
        // token contract
        tokenContract = _tokenContract;
        // token price        
        tokenPrice = _tokenPrice;
    }

    //multiply function
    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    //buy token
    function buyTokens(uint256 _noOfTokens) public payable{
        //Require that value is equal to tokens 
        require(msg.value == multiply(_noOfTokens , tokenPrice));

        //Require that there are enough tokens in contract
        require(tokenContract.balanceOf(address(this)) >= _noOfTokens );

        //msg.sender is buyer here.. so this is actuall buy 
        require(tokenContract.transfer(msg.sender,_noOfTokens));
         
        //Keep track of tokensold
        tokensSold += _noOfTokens;
        //Trigger sale event
        emit Sell(msg.sender, _noOfTokens);
    }
    
    //End token sell
    function endSale() public{
        // Only admin can do this
        require(msg.sender == admin);

        // transfer remaining tokens to admin
        require(tokenContract.transfer(admin,tokenContract.balanceOf(address(this))));

        // destroy contract
        selfdestruct(admin);
    }
}
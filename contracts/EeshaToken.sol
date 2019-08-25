pragma solidity ^0.5.0;

contract EeshaToken{
    uint256 public totalSupply;
    string public name = "EeshaToken";
    string public symbol = "ET";
    string public standard = "Eesha Token v1.0";

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;

    constructor(uint256 _initialSupply) public{
        // allocate the initial supply
        balanceOf[msg.sender] = _initialSupply;
        // set totalSupply
        totalSupply = _initialSupply;
    }

    function transfer(address _to, uint256 _value) public returns(bool success){
        //exception if account doesn't have enough token
        require(balanceOf[msg.sender] >= _value);

        //deduct from send account
        balanceOf[msg.sender] -= _value;

        //add token to receiver account
        balanceOf[_to] += _value;

        //trigger event
        emit Transfer(msg.sender, _to, _value);

        return true;
    }
}
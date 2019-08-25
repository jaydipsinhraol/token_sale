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

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping (address => mapping(address => uint256)) public allowance;

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

    //approve

    function approve(address _spender, uint256 _value) public returns (bool success) {

        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;

    }

    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success) {
        //check _From has enough token
        require(_value <= balanceOf[_from]);
        // check allowance is big enough
        require(_value <= allowance[_from][msg.sender]);

        //change balance
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        //update allowance
        allowance[_from][msg.sender] -= _value;
        
        //transfer event
        emit Transfer(_from, _to, _value);
        //return boolean
        return true;
    }

    //transferFrom

    //

}
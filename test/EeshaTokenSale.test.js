var EeshaToken = artifacts.require('./EeshaToken.sol');
var EeshaTokenSale = artifacts.require('./EeshaTokenSale.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()
    
contract('EeshaTokenSale', async (accounts) =>{
    var buyer = accounts[1];
    var admin = accounts[0];
    let eeshaTokenSale,eeshaToken;
    var tokenPrice = 1000000000000000; //in wei  - 0.001 eth
    var tokensAvailable = 750000;
    var noOfTokens;

    before(async() => {
        eeshaToken = await EeshaToken.deployed()
        eeshaTokenSale = await EeshaTokenSale.deployed()
    });

    it("intializes the contract with correct value", async () =>{
        assert.notEqual(eeshaTokenSale.address, 0x0, "has contract address");
    });

    it("has a token contract", async () =>{
        address = await eeshaTokenSale.tokenContract()
        assert.notEqual(address, 0x0, "has token contract");
    });

    it("has a valid token price", async () =>{
        price = await eeshaTokenSale.tokenPrice()
        assert.equal(price, tokenPrice, "token price is contract");
    });

    it("buy token", async () =>{
        noOfTokens = 10;

        //provision 75% of all tokens to the token sell
        receipt1 = await eeshaToken.transfer(eeshaTokenSale.address, tokensAvailable, {from: admin}); 
        
        receipt = await eeshaTokenSale.buyTokens(noOfTokens, {from : buyer, value: noOfTokens * tokenPrice});
        assert.equal(receipt.logs.length, 1, "triggers one event");
        assert.equal(receipt.logs[0].event, 'Sell', "Should be Sell event");
        assert.equal(receipt.logs[0].args._buyer, buyer, "logs the account  that purchased the tokens");
        assert.equal(receipt.logs[0].args._amount, noOfTokens, "logs the number of token purchased");

        amount = await eeshaTokenSale.tokensSold();
        assert.equal(amount.toNumber(), noOfTokens, "increments the number of token sold");

        eeshaTokenBal = await eeshaToken.balanceOf(eeshaTokenSale.address);
        assert.equal(eeshaTokenBal, tokensAvailable - noOfTokens, "");

        buyerBal = await eeshaToken.balanceOf(buyer);
        assert.equal(buyerBal, noOfTokens);

        //try to buy tokens different from ether value
        // await eeshaTokenSale.buyTokens(noOfTokens, {from: buyer, value:1}).should.be.rejected;

        //try to purchase more tokens than available in contract
        await eeshaTokenSale.buyTokens(800000, {from: buyer, value: noOfTokens*tokenPrice}).should.be.rejected;
    });

    it('End token sell', async() => {
        //try to end sell from another account
        await eeshaTokenSale.endSale({from: buyer}).should.be.rejected; 

        //end sale as admin
        receipt = await eeshaTokenSale.endSale({from: admin}); 

        adminBal = await eeshaToken.balanceOf(admin);
        assert.equal(adminBal.toNumber(), 999990);
        //token price is reset when self destruct be call
        price = await eeshaTokenSale.tokenPrice();

        assert.equal(price.toNumber(),0, "price should reset");


    });
});
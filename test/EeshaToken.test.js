var EeshaToken = artifacts.require('./EeshaToken.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('EeshaToken', (accounts) => {
    let eeshaToken
    before(async() => {
        eeshaToken = await EeshaToken.deployed()
    });

    describe('deployment', async()=> {
        it('deployed successfully', async()=>{
            const address = eeshaToken.address
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
        })
        it('has correct name', async()=>{
            const name = await eeshaToken.name()
            assert.equal(name,"EeshaToken");
        })

        it('has correct symbol', async()=>{
            const symbol = await eeshaToken.symbol()
            assert.equal(symbol,"ET");
        })

        it('has correct standard', async()=>{
            const symbol = await eeshaToken.standard()
            assert.equal(symbol,"Eesha Token v1.0");
        })

        it('sets total supply to 10,00,000', async()=>{
            const totalSupply = await eeshaToken.totalSupply()
            assert.equal(totalSupply.toNumber(),1000000);
        })

        it('allocates the initial supply to admin account', async()=>{
            const adminBalance = await eeshaToken.balanceOf(accounts[0])
            assert.equal(adminBalance.toNumber(),1000000);
        })

        it('transfer token ownership', async()=>{

            //Failure : when account doesn't have enough token to transfer
            await eeshaToken.transfer.call(accounts[1],999999999999999999999999).should.be.rejected;

            //.call is fake call, it doesn't create any real transaction.
            result = await eeshaToken.transfer.call(accounts[1],150,{from : accounts[0]})
            assert.equal(result, true, "it should return true");

            receipt = await eeshaToken.transfer(accounts[1],250000,{from : accounts[0]});

            assert.equal(receipt.logs.length, 1, "triggers one event");
            assert.equal(receipt.logs[0].event, 'Transfer', "Should be Transfer event");
            assert.equal(receipt.logs[0].args._from, accounts[0], "Should log sender account");
            assert.equal(receipt.logs[0].args._to, accounts[1], "Should log receiver account");
            assert.equal(receipt.logs[0].args._value, 250000, "Should log transfer amount");

            rbalance =  await eeshaToken.balanceOf(accounts[1]);
            assert.equal(rbalance.toNumber(),250000, "adds tokens to receiver account");
            sbalance =  await eeshaToken.balanceOf(accounts[0]);
            assert.equal(sbalance.toNumber(),750000, "deducts tokens from sender account");



        })

    })

});
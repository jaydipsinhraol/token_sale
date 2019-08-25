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

        it('sets total supply to 10,00,000', async()=>{
            const totalSupply = await eeshaToken.totalSupply()
            assert.equal(totalSupply.toNumber(),1000000);
        })
    })

});
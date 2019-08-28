const EeshaToken = artifacts.require("EeshaToken");
const EeshaTokenSale = artifacts.require("EeshaTokenSale");
module.exports = async(deployer) => {
  await deployer.deploy(EeshaToken, 1000000);
  //its 0.001 eth
  tokenPrice = 1000000000000000; // in wei
  return deployer.deploy(EeshaTokenSale, EeshaToken.address, tokenPrice);
};

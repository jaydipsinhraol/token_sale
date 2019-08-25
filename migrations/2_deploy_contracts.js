const EeshaToken = artifacts.require("EeshaToken");

module.exports = function(deployer) {
  deployer.deploy(EeshaToken);
};

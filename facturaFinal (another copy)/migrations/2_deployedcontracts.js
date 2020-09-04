const Facturas = artifacts.require("Facturas");

module.exports = function(deployer) {
  deployer.deploy(Facturas,"0xc56e9fbB1490437d8b9cb603e4c32860ebEfF0E1");
};
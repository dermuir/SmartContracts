const Facturas = artifacts.require("./Facturas.sol");

module.exports = function(deployer) {
  deployer.deploy(Facturas,"0x1778b2eccc407fa34f34a54664dc6ff3ce502259");
};

var Migrations = artifacts.require("./Migrations.sol");
var testsol = artifacts.require("./testsol.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(testsol, "Luis Miguel");
};

var Migrations = artifacts.require("./Migrations.sol");
var GestionCurso = artifacts.require("./GestionCurso.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(GestionCurso);
};

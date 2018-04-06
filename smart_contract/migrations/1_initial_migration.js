var Migrations = artifacts.require("./Migrations.sol");
var Ledgacy = artifacts.require("./Ledgacy.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Ledgacy);
};

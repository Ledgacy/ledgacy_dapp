var Ledgacy = artifacts.require("./Ledgacy.sol");

module.exports = function(deployer) {
    deployer.deploy(Ledgacy);
};

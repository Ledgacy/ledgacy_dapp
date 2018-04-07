import Web3 from 'web3';
import * as contract from "truffle-contract";
import LedgacyContract from '../contracts/Ledgacy.json';

const deployedContract = async () =>  {
    console.log("Contract", contract);
    const ledgacyContract = contract.default(LedgacyContract);
    console.log("LedgacyContract", ledgacyContract);
    const web3instance = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    console.log("Created web3", web3instance);
    ledgacyContract.setProvider(web3instance.providers.currentProvider);
    console.log("Set provider");
    const deployedContract = await ledgacyContract.deployed();
    console.log("Got deployed contract");
    return deployedContract;
}

export {deployedContract};
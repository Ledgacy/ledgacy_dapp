import {web3} from "./bonds_setup";
import * as contract from "truffle-contract";
import LedgacyContract from '../contracts/Ledgacy.json';

const deployed_ledgacy_contract = async () => {
    const ledgacyContract = contract(LedgacyContract);
    ledgacyContract.setProvider(web3.currentProvider);
    const deployedContract = await ledgacyContract.deployed();
    return deployedContract;
}

export {deployed_ledgacy_contract}

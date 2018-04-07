import {hexToAscii} from "oo7-parity";
import sjcl from 'sjcl';
import {deployed_ledgacy_contract} from './deployed_ledgacy_contract.js';
import EthCrypto from 'eth-crypto';

const get_profiles = async () => {
    const deployedContract = await deployed_ledgacy_contract();
    const nProfiles = await deployedContract.nProfiles();
    let profiles = [];
    for(let index = 0; index < nProfiles; ++index){
        const address = await deployedContract.getProfileAddress(index);
        console.log(address);
        const profile_name = await deployedContract.getProfileName(address);
        console.log(profile_name);
        const profile_pubkey = await deployedContract.getProfilePublicKey(address);
        profiles.push({address: address, name: profile_name, pubkey: hexToAscii(profile_pubkey)});
    }
    return profiles;
};

const get_profile = async (index) => {
    const deployedContract = await deployed_ledgacy_contract();
};

const get_profile_address = async(index) => {
    const deployedContract = await deployed_ledgacy_contract();
    const address = await deployedContract.getProfileAddress(index);
    return address;
}

export {get_profiles}

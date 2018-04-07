import EthCrypto from 'eth-crypto';
import {deployed_ledgacy_contract} from './deployed_ledgacy_contract.js';
import {web3} from "./bonds_setup";
import {hexToAscii} from "oo7-parity";
let secrets = require('secrets.js-grempe');
let {getAccounts} = require('./get_accounts.js');

const splitAndPersistMasterKeySnippets = async (master_key, trustees, threshold, master_address) => {
    let deployedContract = await deployed_ledgacy_contract();
    let accounts = await getAccounts();
    let shares;
    if(threshold == 1){
        shares = [master_key];
    }else{
        shares = secrets.share(master_key, trustees.length, threshold);
    }
    console.log('ssss shares:', shares);
    let batch = web3.createBatch();
    shares.map(async (share, index) => {
        const trustee = trustees[index];
        const encrypted_keypart = await encryptKeypart(share, trustee, threshold, master_address);
        console.log('encrypted keypart', encrypted_keypart);
        deployedContract.pushEncryptedKeypart(encrypted_keypart, {from: accounts[0]});
    });
};

const encryptKeypart = async (keypart, recipient, threshold, master_address) => {
    console.log("recipient", recipient)
    const keypart_str =  JSON.stringify({keypart: keypart, threshold: threshold, address: master_address, remark: recipient.remark});
    console.log("Plaintext keypart: " + keypart_str);
    const encrypted_keypart = JSON.stringify(await EthCrypto.encryptWithPublicKey(recipient.pubkey, keypart_str));
    return encrypted_keypart;
};

const decryptKeypart = async(encrypted_keypart, private_key) => {
    console.log("Decrypting: ", encrypted_keypart, private_key);
    console.log("Encrypted keypart to ascii", hexToAscii(encrypted_keypart));
    const keypart_str = await EthCrypto.decryptWithPrivateKey(private_key, JSON.parse(hexToAscii(encrypted_keypart)));
    console.log("Decrypted keypart", keypart_str);
    return keypart_str;
}


const combineKeyparts = (keyparts) => {
    if (keyparts.length < 1) {
        return [1, ""];
    }

    console.log("Keypart:", keyparts[0]);
    let threshold = JSON.parse(keyparts[0]).threshold;
    let address = JSON.parse(keyparts[0]).address;
    if (keyparts.length < threshold) {
        return [2, ""];
    }

    let shares = [];

    for (let index = 0; index < keyparts.length; index++) {
        console.log("Keypart: ", keyparts[index])
        let keypart = JSON.parse(keyparts[index]);
        if (keypart.threshold !== threshold) {
            return [3, ""];
        }
        if (keypart.address !== address) {
            return [4, ""];
        }

        shares.push(keypart.keypart);
    }
    let combine;
    if(threshold == 1){
        combine = shares;
    } else {
        combine = secrets.combine(shares);
    }

    console.log("Restored secret:", combine);
    return [0, combine, address];
};

export {splitAndPersistMasterKeySnippets, combineKeyparts, decryptKeypart}

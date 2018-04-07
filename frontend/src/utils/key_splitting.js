import EthCrypto from 'eth-crypto';
import {deployed_ledgacy_contract} from './deployed_ledgacy_contract.js';
import {web3} from "./bonds_setup";
let secrets = require('secrets.js-grempe');
let {getAccounts} = require('./get_accounts.js');

const splitAndPersistMasterKeySnippets = async (master_key, trustees_public_keys, threshold, master_address) => {
    let deployedContract = await deployed_ledgacy_contract();
    let accounts = await getAccounts();
    let shares = secrets.share(master_key, trustees_public_keys.length, threshold);
    console.log('ssss shares:', shares);
    let batch = web3.createBatch();
    shares.map(async (share, index) => {
        const trustee_public_key = trustees_public_keys[index];
        const encrypted_keypart = await encryptKeypart(share, trustee_public_key, threshold, master_address);
        console.log('encrypted keypart', encrypted_keypart);
        deployedContract.pushEncryptedKeypart(encrypted_keypart, {from: accounts[0]});
    });
};

const encryptKeypart = async (keypart, recipient_public_key, threshold, master_address) => {
    const keypart_str =  JSON.stringify({keypart: keypart, threshold: threshold, address: master_address});
    console.log("Plaintext keypart: " + keypart_str);
    const encrypted_keypart = JSON.stringify(await EthCrypto.encryptWithPublicKey(recipient_public_key, keypart_str));
    return encrypted_keypart;
};

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

    let combine = secrets.combine(shares);

    console.log("Restored secret:", combine);
    return [0, combine, address];
};

export {splitAndPersistMasterKeySnippets, combineKeyparts}

import {hexToAscii} from "oo7-parity";
import sjcl from 'sjcl';
import {deployed_ledgacy_contract} from './deployed_ledgacy_contract.js';
import EthCrypto from 'eth-crypto';
import {getAccounts} from "./get_accounts";

const decryptMasterKey = async (encrypted_master_key, ledgacy_private_key) => {
    const decoded_key = JSON.parse(hexToAscii(encrypted_master_key));
    console.log("Decoded key", JSON.stringify(decoded_key))
    return await EthCrypto.decryptWithPrivateKey(ledgacy_private_key, decoded_key);
};

const fetchMasterKey = async (ledgacy_private_key) => {
    const accounts = await getAccounts();
    console.log("Getting master key for account", accounts[0])
    console.log("Getting deployed contract")
    const deployedContract = await deployed_ledgacy_contract();
    console.log("Getting encrypted master key")
    const encrypted_master_key = await deployedContract.getEncryptedMasterKey(accounts[0]);
    console.log("Decrypting master key encrypted:", encrypted_master_key)
    console.log("Ledger private key", ledgacy_private_key)

    const master_key = await decryptMasterKey(encrypted_master_key, ledgacy_private_key);
    console.log("MASTER KEY:", master_key);
    return master_key;
};

export {fetchMasterKey}

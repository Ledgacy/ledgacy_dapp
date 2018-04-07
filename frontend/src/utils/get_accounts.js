import {web3} from "./bonds_setup";

let getAccounts = async () => {
    return new Promise((resolve, reject) => {
        web3.eth.getAccounts((err, accounts) => {
            console.log('accounts:', err, accounts);
            return resolve(accounts);
        })
    });
};

export {getAccounts}

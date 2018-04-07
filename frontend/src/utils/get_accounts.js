import {web3} from "./bonds_setup";

let getAccounts = async () => {
    return new Promise((resolve, reject) => {
        web3.eth.getAccounts((err, accounts) => {
            return resolve(accounts);
        })
    });
};

export {getAccounts}

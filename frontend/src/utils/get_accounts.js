import {web3} from "./bonds_setup";

let getAccounts = async () => {
    return new Promise((resolve, reject) => {

        let account_resolve_interval;
        let account_resolve_fun = () => {
            if(web3.eth !== undefined){
                web3.eth.getAccounts((err, accounts) => {
                    window.clearInterval(account_resolve_interval);
                    return resolve(accounts);
                });
            }
        };
        account_resolve_fun();
        account_resolve_interval = window.setInterval(account_resolve_fun, 5000);
    });
};

export {getAccounts}

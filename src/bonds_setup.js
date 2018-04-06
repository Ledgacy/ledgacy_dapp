// sets up Bonds in a way that is compatible with MetaMask (and hopefully Mist as well)
import {bonds, options as bonds_options} from 'oo7-parity';
/* import {InputBond} from 'parity-reactive-ui';*/
import Api from '@parity/api';


var provider;
var parityapi;
var web3;
window.addEventListener('load', function() {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask, Parity does this as well but would result in no-op.)
    if (typeof window.web3 !== 'undefined') {

        // Use the browser's ethereum provider
        window.provider = provider = window.web3.currentProvider
        web3 = window.web3;
        console.log("PROVIDER: ", provider)
        window.parityapi = parityapi = new Api(provider)
        bonds_options.api = parityapi
    } else {
        console.log('No web3? You should consider trying MetaMask!')
    }
})



export {bonds, bonds_options, web3};

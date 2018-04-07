import React, { Component } from 'react';
import './App.css';

import {Rspan} from 'oo7-react';
/* import {bonds, options as bonds_options} from 'oo7-parity';*/
/* import {InputBond} from 'parity-reactive-ui';*/
/* import Api from '@parity/api';*/
import {bonds} from './bonds_setup.js'
import {sha3, asciiToHex} from 'oo7-parity'
import EthCrypto from 'eth-crypto';
import * as contract from "truffle-contract";
import LedgacyContract from './contracts/Ledgacy.json';
import {web3} from "./bonds_setup";
import {deployed_ledgacy_contract} from './deployed_ledgacy_contract.js'

import { Button, Container } from 'semantic-ui-react'
import {Dashboard} from './components/Dashboard'
import {Login} from './components/Login'
import {Signup} from './components/Signup'
import {getAccounts} from './get_accounts'

const initial_state = {
    page: 'login',
    ledgacyKeypair: null,
    profile_name: null,
}

class App extends Component {

    constructor(){
        super()
        this.bond = bonds.time
        this.blocknum_bond = bonds.blockNumber
        this.state = initial_state;
    }

    componentDidMount = async () => {
        // Try to log the user in from sessionStorage
        let maybe_keypair= window.sessionStorage.getItem('ledgacy_keypair');
        let maybe_address = window.sessionStorage.getItem('ledgacy_address');

        const accounts = await getAccounts();
        console.log('accounts:', accounts);

        console.log('keypair seed:', maybe_keypair)
        if(maybe_keypair !== null && maybe_address === accounts[0]){
            this.handleSignIn(JSON.parse(maybe_keypair));
        }
    }


    handleSignUp = async () => {
        console.log("HANDLING SIGN UP");
        // TODO: Fix this!
        this.handleSignIn(this.state.ledgacyKeypair);

    }

    handleSignIn = async (keypair) => {
        /* const keypair = await this.regenerateKeyPair(ledgacy_keypair_seed);*/
        const accounts = await getAccounts();
        console.log('accounts:', accounts);

        console.log('logged in using keypair!', keypair);
        window.sessionStorage.setItem('ledgacy_keypair', JSON.stringify(keypair));
        window.sessionStorage.setItem('ledgacy_address', accounts[0]);
        this.setState({...this.state,
                       ledgacyKeypair: keypair,
                       isLoggedIn: true,
        })
        await this.lookupProfile(accounts[0]);
    }

    lookupProfile = async (address) => {

        try{
            /* let ledgacyContract = contract(LedgacyContract);
             * ledgacyContract.setProvider(web3.currentProvider);
             * const deployedContract = await ledgacyContract.deployed();*/
        const deployedContract = await deployed_ledgacy_contract();

        const name = await deployedContract.getProfileName(address);
        console.log('profile name:', name);
        if(name === ''){
            this.setState({...this.state,
                           isLoggedIn: true,
                           page: 'signup'
            })
            return;
        }

        const publickey = deployedContract.getProfilePublicKey(address);
        console.log('profile pubkey', publickey);
        this.setState({...this.state,
                       isLoggedIn: true,
                       profileName: name,
                       page: 'dashboard',
        })

        }catch(error){
            alert('The Ledgacy Smart Contract does not seem to be deployed on this Chain. Please check what Blockchain Network you are connecting to.')
        }
    }



    handleSignOut = () => {
        console.log(window.sessionStorage.getItem('ledgacy_keypair'));
        window.sessionStorage.removeItem('ledgacy_keypair');
        window.sessionStorage.removeItem('ledgacy_address');
        console.log(window.sessionStorage.getItem('ledgacy_keypair'));
        this.setState(initial_state);
    }


  render() {
      console.log(this.state);
    return (
      <div className="App">
        {this.state.page === 'dashboard' ?
         <Dashboard
            handleSignOut={this.handleSignOut}
            keypair={this.state.ledgacyKeypair}
            profileName={this.state.profileName}
         />
       : this.state.page === 'signup' ?
         <Signup handleSignUp={this.handleSignUp} keypair={this.state.ledgacyKeypair} />
       : <Login handleSignIn={this.handleSignIn}/>}
      </div>
    );
  }
}

export default App;

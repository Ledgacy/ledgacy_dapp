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

import { Button, Container } from 'semantic-ui-react'
import {Dashboard} from './components/Dashboard.js'
import {Login} from './components/Login.js'
import {Signup} from './components/Signup.js'
import {getAccounts} from './components/GetAccounts.js'

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

    regenerateKeyPair = async (ledgacy_keypair_seed) => {
        const ledgacy_priv = sha3(ledgacy_keypair_seed);
        const ledgacy_public = await EthCrypto.publicKeyByPrivateKey(ledgacy_priv);
        const keypair = {private: ledgacy_priv, public: ledgacy_public};
        return keypair;
    }

    lookupProfile = async (address) => {
        let ledgacyContract = contract(LedgacyContract);
        ledgacyContract.setProvider(web3.currentProvider);
        const deployedContract = await ledgacyContract.deployed();

        const name = await deployedContract.getProfileName(address);
        console.log('profile name:', name);
        if(name === ''){
            this.setState({...this.state, page: 'signup'})
            return;
        }

        const publickey = deployedContract.getProfilePublicKey(address);
        console.log('profile pubkey', publickey);
        this.setState({...this.state, page: 'dashboard'})
    }

    handleSignIn = async (ledgacy_keypair_seed) => {
        const keypair = await this.regenerateKeyPair(ledgacy_keypair_seed);
        const accounts = await getAccounts();
        const profile_name = await this.lookupProfile(accounts[0]);

        console.log('logged in using keypair!', keypair);
        this.setState({...this.state,
                       ledgacyKeypair: keypair,
                       isLoggedIn: true,
                       profileName: profile_name
        })
    }

    handleSignUp = async () => {

    }

    handleSignOut = () => {
        this.setState(initial_state);
    }


  render() {
      console.log(this.state);
    return (
      <div className="App">
        {this.state.page === 'dashboard' ?
         <Dashboard handleSignOut={this.handleSignOut} keypair={this.state.ledgacyKeypair}/>
       : this.state.page === 'signup' ?
         <Signup handleSignUp={this.handleSignUp} />
       : <Login handleSignIn={this.handleSignIn}/>}
      </div>
    );
  }
}

export default App;

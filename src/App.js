import React, { Component } from 'react';
import './App.css';

import {Rspan} from 'oo7-react';
/* import {bonds, options as bonds_options} from 'oo7-parity';*/
/* import {InputBond} from 'parity-reactive-ui';*/
/* import Api from '@parity/api';*/
import {bonds} from './bonds_setup.js'
import {sha3, asciiToHex} from 'oo7-parity'
import EthCrypto from 'eth-crypto';

import { Button, Container } from 'semantic-ui-react'
import {Dashboard} from './components/Dashboard.js'
import {Login} from './components/Login.js'

const initial_state = {
    isLoggedIn: false,
    ledgacyKeypair: null
}

class App extends Component {

    constructor(){
        super()
        this.bond = bonds.time
        this.blocknum_bond = bonds.blockNumber
        this.state = initial_state;
    }

    handleSignIn = (ledgacy_keypair_seed) => {
        const ledgacy_priv = sha3(ledgacy_keypair_seed);
        const ledgacy_public = EthCrypto.publicKeyByPrivateKey(ledgacy_priv);
        const keypair = {private: ledgacy_priv, public: ledgacy_public};

        console.log('logged in using keypair!', keypair);
        this.setState({...this.state, ledgacyKeypair: keypair, isLoggedIn: true})
    }

    handleSignOut = () => {
        this.setState(initial_state);
    }


  render() {
      console.log(this.state);
    return (
      <div className="App">
          {this.state.isLoggedIn ? <Dashboard handleSignOut={this.handleSignOut} keypai={this.state.keypair}/> : <Login handleSignIn={this.handleSignIn}/>}
      </div>
    );
  }
}

export default App;

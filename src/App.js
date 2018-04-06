import React, { Component } from 'react';
import './App.css';

import {Rspan} from 'oo7-react';
/* import {bonds, options as bonds_options} from 'oo7-parity';*/
/* import {InputBond} from 'parity-reactive-ui';*/
/* import Api from '@parity/api';*/
import {bonds} from './bonds_setup.js'

import { Button, Container } from 'semantic-ui-react'
import {Dashboard} from './components/Dashboard.js'
import {Login} from './components/Login.js'
import SecretPusher from "./components/SecretPusher";

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

        // TODO actual cryptography.
        let keypair = ledgacy_keypair_seed;
        console.log('asdf!');
        this.setState({...this.state, ledgacyKeypair: keypair, isLoggedIn: true})
    }

    handleSignOut = () => {
        this.setState(initial_state);
    }


  render() {
      console.log(this.state);
    return (
      <div className="App">
          {this.state.isLoggedIn ? <Dashboard handleSignOut={this.handleSignOut.bind(this)}/> : <Login handleSignIn={this.handleSignIn.bind(this)}/>}
          <SecretPusher/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Rspan} from 'oo7-react';
/* import {bonds, options as bonds_options} from 'oo7-parity';*/
/* import {InputBond} from 'parity-reactive-ui';*/
/* import Api from '@parity/api';*/
import {bonds} from './bonds_setup.js'



class App extends Component {
    constructor(){
        super()
        this.bond = bonds.time
        this.blocknum_bond = bonds.blockNumber
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Ledgacy</h1>
        </header>
        <Rspan>Current time: {this.bond.map(t => new Date(t).toString())}</Rspan>
        <div>
            Test
        </div>
        <Rspan>Block Number: {this.blocknum_bond}</Rspan>
      </div>
    );
  }
}

export default App;

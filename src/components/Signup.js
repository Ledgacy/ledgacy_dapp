import {web3} from '../bonds_setup.js'
import * as contract from 'truffle-contract';
import LedgacyContract from "../contracts/Ledgacy.json";
import {sha3, asciiToHex, hexToAscii} from 'oo7-parity'
import {getAccounts} from "./GetAccounts";
import sjcl from 'sjcl';


import React, { Component } from 'react';
import logo from '../ledgacy_logo.svg';

import {Message, Input, Button} from 'semantic-ui-react';

const doesProfileExist = async (address) => {
    let ledgacyContract = contract(LedgacyContract);
    ledgacyContract.setProvider(web3.currentProvider);
    const deployedContract = await ledgacyContract.deployed();
    const name = await deployedContract.getProfileName(address);
    return name !== '';
};

class Signup extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            waiting: false,
        }
    }

    generateMasterkey = () => {
        return sha3(JSON.stringify(new Buffer(sjcl.random.randomWords(10, 10)).toString()));
    }

    trySignUp = async () => {
        console.log('signUp!');
        if(this.state.name == '') {
            return;
        }

        const accounts = await getAccounts();
        let generated_masterkey = this.generateMasterkey();
        console.log('Generated Masterkey: ', generated_masterkey);

        let ledgacyContract = contract(LedgacyContract);
        ledgacyContract.setProvider(web3.currentProvider);
        const deployedContract = await ledgacyContract.deployed();
        console.log('Creating Profile:', this.state.name, this.props.keypair, asciiToHex(generated_masterkey));

        console.log('creating profile');
        let err, result = await deployedContract.createProfile(this.state.name, this.props.keypair.public, generated_masterkey, {from: accounts[0]});
        console.log('after creating profile');
        this.setState({...this.state, waiting: true});

        let waitForProfileInterval = window.setInterval(() =>{
            if(doesProfileExist(accounts[0])){
                window.clearInterval(waitForProfileInterval);
                this.props.handleSignUp();
            }
        }, 2000);
    }

    changeName = (event, name) => {
        console.log('changing name', event, name.value);
        this.setState({...this.state, name: name.value});
    }

    render = () => {
        return (
                <div>
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">
                    Trustworthy Decentralized Secrets Manager
                </h1>
                </header>
                <Message positive>
                <Message.Header>
                This seems to be your first time here!
            </Message.Header>
                <p>
                Please create your Ledgacy Profile by entering adding your name to the Ledgacy Smart Contract.
                </p>
                </Message>
                <Input onChange={this.changeName} disabled={this.state.waiting} placeholder='Your Name' />
                <Button onClick={this.trySignUp} disabled={this.state.waiting}>
                    {this.state.waiting ? "Waiting for transaction to be mined..." : 'Sign Up!'}
                </Button>
            </div>
        )
    }
}

export {Signup}

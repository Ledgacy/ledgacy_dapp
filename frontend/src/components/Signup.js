import {sha3, asciiToHex} from 'oo7-parity'
import {getAccounts} from "../utils/get_accounts";
import sjcl from 'sjcl';
import {deployed_ledgacy_contract} from '../utils/deployed_ledgacy_contract.js'
import EthCrypto from 'eth-crypto';


import React, { Component } from 'react';
import logo from '../ledgacy_logo.svg';

import {Message, Input, Button, Container} from 'semantic-ui-react';

const doesProfileExist = async (address) => {
    const deployedContract = await deployed_ledgacy_contract();
    const name = await deployedContract.getProfileName(address);
    console.log("profile name (does exist):", name);
    return name !== undefined && name !== '';
};

const initial_state = {
    name: '',
    waiting: false,
}


class Signup extends Component {
    constructor(){
        super()
        this.state = initial_state
    }

    generateMasterkey = () => {
        return sha3(JSON.stringify(new Buffer(sjcl.random.randomWords(10, 10)).toString()));
    }

    trySignUp = async () => {
        console.log('signUp!');
        if(this.state.name === '') {
            return;
        }

        const accounts = await getAccounts();
        let generated_masterkey = this.generateMasterkey();
        console.log('Generated Masterkey: ', generated_masterkey);
        const encrypted_masterkey = await EthCrypto.encryptWithPublicKey(this.props.keypair.public, generated_masterkey);
        console.log('encrypted masterkey: ', encrypted_masterkey, 'pubkey:', this.props.keypair.public);
        console.log("Encrypted masterkey stringified: " + JSON.stringify(encrypted_masterkey))
        const deployedContract = await deployed_ledgacy_contract();
        console.log('Creating Profile:', this.state.name, this.props.keypair, generated_masterkey, JSON.stringify(encrypted_masterkey));

        console.log('starting creating profile transaction');
        console.log("Creating profile for address", accounts[0]);
        let {err, result} = await deployedContract.createProfile(this.state.name, this.props.keypair.public, JSON.stringify(encrypted_masterkey), {from: accounts[0]});
        if(err){
            this.setState(initial_state);
            alert('You rejected the transaction. Please try again');
            return;
        }
        console.log('after creating profile');
        this.setState({...this.state, waiting: true});

        let waitForProfileInterval = window.setInterval(async () =>{
            if(await doesProfileExist(accounts[0])){
                window.clearInterval(waitForProfileInterval);
                console.log("Calling handleSignUp");
                this.props.handleSignUp();
            }
        }, 2000);
    }

    changeName = (event, name) => {
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

                <Container className="App-signup">
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
                </Container>
            </div>
        )
    }
}

export {Signup}

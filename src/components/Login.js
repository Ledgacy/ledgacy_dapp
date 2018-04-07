// logical:
import React, { Component } from 'react';
import {ReactiveComponent, Rspan} from 'oo7-react';
import {bonds, web3} from '../bonds_setup.js';
import {sha3, asciiToHex} from 'oo7-parity'
import EthCrypto from 'eth-crypto';
import * as contract from "truffle-contract";
import LedgacyContract from '../contracts/Ledgacy.json';


// visual:
import { Button, Container, Message } from 'semantic-ui-react';
import logo from '../ledgacy_logo.svg';

import {getAccounts} from "./GetAccounts";

class Login extends ReactiveComponent {
    constructor(){
        super()
        this.state = {showError: false}
    }

    trySignIn = async () => {
        let accounts = await getAccounts();
        web3.eth.sign(accounts[0], sha3('Sign In into the Ledgacy Decentralized Application'), async (err, signing_result) => {
            console.log(err, signing_result);
            if(err != null){
                // At some point show error message.
                this.setState({...this.state, showError: true})
                return;
            } else {
                this.setState({...this.state, showError: false})
            }
            console.log(this.props);
            const keypair = await this.regenerateKeyPair(signing_result);
            this.props.handleSignIn(keypair);
        });
    }

    regenerateKeyPair = async (ledgacy_keypair_seed) => {
        const ledgacy_priv = sha3(ledgacy_keypair_seed);
        const ledgacy_public = await EthCrypto.publicKeyByPrivateKey(ledgacy_priv);
        const keypair = {private: ledgacy_priv, public: ledgacy_public};
        console.log("KEYPAIR: ", keypair);
        return keypair;
    }



    render() {
        const message = !this.state.showError ? '' : (
                <Message error>
                <Message.Header>You have to sign in using your Ethereum Wallet</Message.Header>
                <p>
                    The Ledgacy Dapp deterministically generates your master keypair based on your Ethereum signature.
                    Therefore, you really have to sign the message that pops up when you click the 'sign in' link.
                </p>
            </Message>
        );

        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">
                        Trustworthy Decentralized Secrets Manager
                    </h1>
                </header>
                <Container>
                {message}
                    <Button primary onClick={this.trySignIn}> I want to sign in </Button>
                </Container>
            </div>
        )
    }
}

export {Login}

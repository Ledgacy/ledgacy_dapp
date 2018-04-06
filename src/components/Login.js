// logical:
import React, { Component } from 'react';
import {ReactiveComponent, Rspan} from 'oo7-react';
import {bonds, web3} from '../bonds_setup.js';
import {sha3, asciiToHex} from 'oo7-parity'

// visual:
import { Button, Container } from 'semantic-ui-react';
import logo from '../ledgacy_logo.svg';

let getAccounts = async () => {
    return new Promise((resolve, reject) => {
        web3.eth.getAccounts((err, accounts) => {
            console.log('accounts:', err, accounts);
            return resolve(accounts);
        })
    });
};

class Login extends ReactiveComponent {
    constructor(){
        super()
        this.state = {}
    }

    trySignIn = async () => {
        let accounts = await getAccounts();
        web3.eth.sign(accounts[0], sha3('test'), (err, signing_result) => {
            console.log(err, signing_result);
            if(err != null){
                console.log("ERROR DURING LOGIN:", err);
                // At some point show error message.
                return;
            }
            console.log(this.props);
            this.props.handleSignIn(signing_result)
        });
    }


    render(){
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">
                        Trustworthy Decentralized Secrets Manager
                    </h1>
                </header>
                <Container>
                    <Button primary onClick={this.trySignIn}> I want to sign in </Button>
                </Container>
            </div>
        )
    }
}

export {Login}

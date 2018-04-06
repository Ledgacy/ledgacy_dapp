// logical:
import React, { Component } from 'react';
import {ReactiveComponent, Rspan} from 'oo7-react';
import {bonds, web3} from '../bonds_setup.js';
import {sha3, asciiToHex} from 'oo7-parity'

// visual:
import { Button, Container } from 'semantic-ui-react';
import logo from '../logo.svg';


class Login extends ReactiveComponent {
    constructor(){
        super()
        this.state = {}
    }

    trySignIn = () => {
        web3.eth.sign(web3.eth.accounts[0], sha3('test'), (err, signing_result) => {
            console.log(err, signing_result);
            if(err != null){
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
                        Ledgacy
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

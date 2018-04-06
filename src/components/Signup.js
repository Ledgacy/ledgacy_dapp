import React, { Component } from 'react';
import logo from '../ledgacy_logo.svg';

import {Message, Input, Button} from 'semantic-ui-react';

class Signup extends Component {
    constructor(){
        super()
        this.state = {
            name:'',
            waiting: false,
        }
    }

    handleSignup = () => {
        if(this.name == ''){
            return;
        }

    }

    changeName = (event, name) => {
        this.setState({...this.state, name: name});
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
                <Button onClick={this.handleSignup} disabled={this.state.waiting}>
                    {this.state.waiting ? "Waiting for transaction to be mined..." : 'Sign Up!'}
                </Button>
            </div>
        )
    }
}

export {Signup}

// logical:
import React, { Component } from 'react';
import {web3} from '../utils/bonds_setup.js';
import {getAccounts} from "../utils/get_accounts";
import {sha3} from 'oo7-parity';
import EthCrypto from 'eth-crypto';


// visual:
import { Button, Container, Message, Modal, Icon } from 'semantic-ui-react';
import logo from '../ledgacy_logo.svg';
import {TrusteeField} from "./TrusteeField";
import {get_profiles} from "../utils/get_profiles";
import {deployed_ledgacy_contract} from "../utils/deployed_ledgacy_contract";

import {Howl} from 'howler';
import login_soundfile from "./boot.mp3";

const login_sound = new Howl({
    src: [login_soundfile],
});


class Login extends Component {
    constructor(){
        super()
        this.state = {showError: false, showSelector: false, potential_trustees: []}
    }

    componentDidMount = async() => {

        const waitForWeb3Interval = window.setInterval(async () => {
            if (web3.currentProvider !== undefined){
                window.clearInterval(waitForWeb3Interval);
            }
        }, 1000);
    }

    trySignIn = async () => {
        let accounts = await getAccounts();
        if(accounts.length < 1){
            alert("No connection to the Ethereum blockchain possible. Please make sure that you have an Ethereum wallet installed, and you are logged in.");
            return;
        }
        web3.eth.sign(accounts[0], sha3('Sign In into the Ledgacy Decentralized Application'), async (err, signing_result) => {
            if(err != null){
                // At some point show error message.
                this.setState({...this.state, showError: true})
                return;
            } else {
                this.setState({...this.state, showError: false})
            }
            const keypair = await this.regenerateKeyPair(signing_result);
            login_sound.play();
            await this.props.handleSignIn(keypair);
        });
    }

    regenerateKeyPair = async (ledgacy_keypair_seed) => {
        const ledgacy_priv = sha3(ledgacy_keypair_seed);
        const ledgacy_public = await EthCrypto.publicKeyByPrivateKey(ledgacy_priv);
        const keypair = {private: ledgacy_priv, public: ledgacy_public};
        return keypair;
    }

    showSelector = async () => {
        let potential_trustees = await get_profiles();
        this.setState({...this.state, showSelector: true, potential_trustees: potential_trustees});
    }

    selectProfile = (profile) => {
        console.log(profile)
        this.setState({...this.state, profile: profile});
    }

    callHelp = async () => {
        if (this.state.profile) {
            const ledgacyContract = await deployed_ledgacy_contract();
            const accounts = await getAccounts();
            await ledgacyContract.writeMessage(this.state.profile.address, "HELP", {from: accounts[0]});
            console.log("Sent call for help");
        }
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
                <Container className="App-login">
                {message}
                    <Button size='large' primary onClick={this.trySignIn}> I want to sign in </Button>
                </Container>
                <br/>
                <Container className="App-login">
                <Button basic size='tiny' color='orange' onClick={this.showSelector}> I lost my key!</Button>
                </Container>
                <br/>
                {this.state.showSelector?
                    <Container className="App-login">
                        <h3>Select your profile</h3>
                        <div className="centerBox">
                        <TrusteeField source={this.state.potential_trustees} className="helpSelector" handleTrusteeChange={this.selectProfile} noremark={true}/>
                        </div>
                        <br/>
                        <Button color='red' onClick={this.callHelp}>Send call for help!</Button>
                    </Container>
                : null}
            </div>
        );
    }
}

export {Login}

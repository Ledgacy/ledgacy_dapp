import React, { Component } from 'react';
import LedgacyContract from "../contracts/Ledgacy.json";
import * as contract from 'truffle-contract';
import {web3} from '../bonds_setup.js'
import { Button } from 'semantic-ui-react';
import {sha3, asciiToHex, hexToAscii} from 'oo7-parity'

class SecretPusher extends Component {
    ledgacyContract;
    result;

    constructor(){
        super();
    }


    componentDidMount = () => {
        console.log("WEB3");
        console.log(web3);
        this.ledgacyContract = contract(LedgacyContract);
        this.ledgacyContract.setProvider(web3.currentProvider);

        console.log("Instantiated contract");
        console.log(this.ledgacyContract);
    }

    pushSecret = async () => {
        console.log(this.ledgacyContract);
        const deployedContract = await this.ledgacyContract.deployed();
        await deployedContract.pushSecret(asciiToHex("test"), {from: web3.eth.accounts[0]});
    }

    readSecrets = async () => {
        const deployedContract = await this.ledgacyContract.deployed();
        console.log('before');
        let nSecrets = await deployedContract.secretsCount.call();
        console.log('after');
        let secrets = []
        for(let index = 0; index < nSecrets; ++index){
            let result = await deployedContract.readSecret.call(0);
            console.log(hexToAscii(result))
            secrets.push(result);
        }
        console.log('secrets', secrets);
    }


    render() {
        return (
            <div className="ProfileCreator">
                <Button primary onClick={this.pushSecret}> Push secret {this.result} </Button>
                <Button onClick={this.readSecrets}>Read Secrets</Button>
            </div>
        );
    }
}

export default SecretPusher;

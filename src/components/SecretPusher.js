import React, { Component } from 'react';
import LedgacyContract from "../contracts/Ledgacy.json";
import * as contract from 'truffle-contract';
import {web3} from '../bonds_setup.js'
import { Button } from 'semantic-ui-react';

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
        await deployedContract.pushSecret("0x000011112222333344445555666677778888".valueOf(), {from: web3.eth.accounts[0]});
    }

    readSecrets = async () => {
        const deployedContract = await this.ledgacyContract.deployed();
        let result = await deployedContract.readSecret.call(0);
        console.log(result)
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

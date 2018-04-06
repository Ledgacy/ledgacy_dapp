import {web3} from '../bonds_setup.js'
import * as contract from 'truffle-contract';
import LedgacyContract from "../contracts/Ledgacy.json";
import {sha3, asciiToHex, hexToAscii} from 'oo7-parity'

import React, {Component} from 'react'
import {List, Table, Input, Button} from 'semantic-ui-react'
import EthCrypto from 'eth-crypto';
import {getAccounts} from "./GetAccounts";

const initial_state = {
    name: '',
    content: '',
    submitted: false,
    saving: false,
    nSecrets: 0
}

class AddSecret extends Component {
    ledgacyContract;

    constructor() {
        super()
        this.state = initial_state
    }

    componentDidMount = () => {
        console.log("WEB3");
        console.log(web3);
        this.ledgacyContract = contract(LedgacyContract);
        this.ledgacyContract.setProvider(web3.currentProvider);

        console.log("Instantiated contract");
        console.log(this.ledgacyContract);
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.state.nSecrets !== nextProps.nSecrets)
            this.setState({...initial_state, nSecrets: nextProps.nSecrets });
    }


    changeContent = (event, content) => {
        this.setState({...this.state, content: content.value})
    }


    changeName = (event, name) => {
        this.setState({...this.state, name: name.value})
    }

    saveToBlockchain = async () => {
        this.setState({...this.state, saving: true});
        let secret = {name:this.state.name, content:this.state.content};
        console.log("Storing this secret to the blockchain!", secret);

        this.setState({...this.state, name: "", content: ""});

        console.log(this.ledgacyContract);
        const deployedContract = await this.ledgacyContract.deployed();

        console.log("Got contract");
        const secret_str = JSON.stringify(secret);
        const encrypted_secret = await EthCrypto.encryptWithPublicKey(this.props.keypair.public, secret_str);

        console.log("Encrypted secret", encrypted_secret);
        let accounts = await getAccounts();
        let err, result = await deployedContract.pushSecret(asciiToHex(JSON.stringify(encrypted_secret)), {from: accounts[0]});
        console.log("Pushed secret");
        console.log(err, result);
        // TODO error handling

        this.setState({...this.state, saving: false, submitted: true});

        // const secretUpdateInterval = window.setInterval(() => {
        //     if(this.props.nSecrets == secret_count){
        //         return;
        //     }
        //     window.clearInterval(secretUpdateInterval);
        // });
    }

    render = () => {
        const submitted = (
            !this.state.submitted ? ''  : (
                <Table.Cell colspan={3} >
                    <em>
                        Waiting for transaction to be mined...
                    </em>
                </Table.Cell>
            )
        )
        return ([
                <Table.Row key={0}>{submitted}</Table.Row>,
                <Table.Row key={1}>
                <Table.Cell>
                <Input fluid placeholder='Name' onChange={this.changeName} disabled={this.state.saving} value={this.state.name}/>
                </Table.Cell>
                <Table.Cell>
                <Input fluid placeholder='Secret' onChange={this.changeContent} disabled={this.state.saving} value={this.state.content}/>
                </Table.Cell>
                <Table.Cell>
                <Button onClick={this.saveToBlockchain} disabled={this.state.saving} >{ this.state.saving? "Saving..." : "Save!"}</Button>
                </Table.Cell>
                </Table.Row>
        ])
    }
}
export {AddSecret}

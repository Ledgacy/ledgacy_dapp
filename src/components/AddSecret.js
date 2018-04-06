import {web3} from '../bonds_setup.js'
import * as contract from 'truffle-contract';
import LedgacyContract from "../contracts/Ledgacy.json";
import {sha3, asciiToHex, hexToAscii} from 'oo7-parity'

import React, {Component} from 'react'
import {List, Table, Input, Button} from 'semantic-ui-react'


class AddSecret extends Component {
    ledgacyContract;

    constructor() {
        super()
        this.state = {
            name: '',
            content: '',
            submitted: false,
            saving: false,
        }
    }

    componentDidMount = () => {
        console.log("WEB3");
        console.log(web3);
        this.ledgacyContract = contract(LedgacyContract);
        this.ledgacyContract.setProvider(web3.currentProvider);

        console.log("Instantiated contract");
        console.log(this.ledgacyContract);
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
        let err, result = await deployedContract.pushSecret(asciiToHex(JSON.stringify(secret)), {from: web3.eth.accounts[0]});
        console.log(err, result);
        // TODO error handling

        this.setState({...this.state, saving: false, submitted: true});
    }

    render = () => {
        return (
                <Table.Row>
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
        )
    }
}
export {AddSecret}

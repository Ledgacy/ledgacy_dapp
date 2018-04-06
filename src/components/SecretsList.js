import React, {Component} from 'react'
import {List, Table} from 'semantic-ui-react'

import {Secret} from './Secret.js'
import {AddSecret} from './AddSecret.js'
import {hexToAscii} from "oo7-parity";
import {web3} from "../bonds_setup";
import * as contract from "truffle-contract";
import LedgacyContract from '../contracts/Ledgacy.json';


class SecretsList extends Component {
    ledgacyContract;
    constructor() {
        super()
        this.state = {
            secrets: [],
            loaded: false,
        }
    }

    componentDidMount = async () =>{
        // attempt to load secrets from the blockchain
        // and decrypt it using private key.
        this.ledgacyContract = contract(LedgacyContract);
        this.ledgacyContract.setProvider(web3.currentProvider);
        this.setState({...this.state, loaded: true})

        await this.fetchSecrets();
    }

    fetchSecrets = async () => {
        const deployedContract = await this.ledgacyContract.deployed();
        console.log('before');
        let nSecrets = await deployedContract.secretsCount();
        console.log('after');
        let secrets = []
        for(let index = 0; index < nSecrets; ++index){
            let result = await deployedContract.readSecret.call(index);

            console.log(hexToAscii(result))
            secrets.push(JSON.parse(hexToAscii(result)));
        }
        this.setState({...this.state, secrets: secrets});
        console.log('secrets', secrets);
    }

    render = () => {
        const secretsList = this.state.secrets.map(secret => {
            return <Secret secret={secret} key={"secret_" + secret.name}/>
        })

        const tableBody = this.state.loaded ? secretsList : (
                <Table.Row>
                <Table.Cell>
                Loading list of secrets...
                </Table.Cell>
                </Table.Row>
        )

        // <List divided relaxed>
        // { this.state.loaded ? secretsList : "Loading list of secrets..."}
        // </List>


        return (
                <Table celled>
                <Table.Row>
                <Table.HeaderCell>Key</Table.HeaderCell>
                <Table.HeaderCell>Secret</Table.HeaderCell>
                <Table.HeaderCell>
                </Table.HeaderCell>
                </Table.Row>
                {tableBody}
                <AddSecret />
            </Table>
        );
    }
}
export {SecretsList}

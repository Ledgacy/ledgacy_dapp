import React, {Component} from 'react'
import {List, Table} from 'semantic-ui-react'

import {Secret} from './Secret.js'
import {AddSecret} from './AddSecret.js'
import {hexToAscii} from "oo7-parity";
import {web3} from "../../utils/bonds_setup";
import * as contract from "truffle-contract";
import LedgacyContract from '../../contracts/Ledgacy.json';
import EthCrypto from 'eth-crypto';
import sjcl from 'sjcl';
import {deployed_ledgacy_contract} from '../../utils/deployed_ledgacy_contract.js'

class SecretsList extends Component {
    /* ledgacyContract;*/
    fetchSecretsInterval;
    constructor() {
        super()
        this.state = {
            secrets: [],
            loaded: false,
            masterkey: null
        }
    }

    componentDidMount = async () =>{
        // attempt to load secrets from the blockchain
        // and decrypt it using private key.
        /* this.ledgacyContract = contract(LedgacyContract);
         * this.ledgacyContract.setProvider(web3.currentProvider);*/
        this.setState({...this.state, loaded: true})

        await this.fetchSecrets();
        this.fetchSecretsInterval = setInterval(this.fetchSecrets, 2000);
    }

    componentWillUnmount = () => {
        window.clearInterval(this.fetchSecretsInterval);
    }

    fetchMasterKey = async () => {
        const deployedContract = await deployed_ledgacy_contract();
        const encrypted_master_key = await deployedContract.getEncryptedMasterKey();
        console.log(encrypted_master_key);
        // TODO
        const master_key = encrypted_master_key;
        /* const master_key = EthCrypto.decryptWithPrivateKey(encrypted_master_key);*/
        console.log('master key', master_key);
        return master_key;

    }

    fetchSecrets = async () => {
        const master_key = await this.fetchMasterKey();
        console.log(master_key, hexToAscii(master_key));
        const deployedContract = await deployed_ledgacy_contract();
        /* const deployedContract = await this.ledgacyContract.deployed();*/
        //console.log('before');
        let nSecrets = await deployedContract.secretsCount();
        if(nSecrets === this.state.secrets.length)
            return;
        //console.log('after');
        let secrets = []
        for(let index = 0; index < nSecrets; ++index){
            let result = await deployedContract.readSecret.call(index);

            // console.log("Private key", this.props.keypair)
            // console.log("Typeof", typeof this.props.keypair.private);
            // console.log("Result", result)
            // console.log("Hextoascii", hexToAscii(result))
            // console.log("Encrypted: ", JSON.parse(hexToAscii(result)));
            const encrypted_secret = hexToAscii(result);
            const secret_str = sjcl.decrypt(master_key, encrypted_secret);
            /* const secret_str = await EthCrypto.decryptWithPrivateKey(this.props.keypair.private, JSON.parse(hexToAscii(result)));*/
            // console.log(secret_str);
            const secret = JSON.parse(secret_str);
            // console.log(hexToAscii(result), secret_str, secret)
            secrets.push(secret);
        }
        this.setState({...this.state, secrets: secrets, masterkey: master_key});
        //console.log('secrets', secrets);
    }

    render = () => {
        const secretsList = this.state.secrets.map((secret, index) => {
            return <Secret secret={secret} key={index}/>
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
                    <tbody>
                        <Table.Row>
                            <Table.HeaderCell>Key</Table.HeaderCell>
                            <Table.HeaderCell>Secret</Table.HeaderCell>
                            <Table.HeaderCell>
                            </Table.HeaderCell>
                        </Table.Row>
                        {tableBody}
                        <AddSecret masterkey={this.state.masterkey} saveHandle={this.fetchSecrets} nSecrets={this.state.secrets.length}/>
                    </tbody>
                </Table>
        );
    }
}
export {SecretsList}

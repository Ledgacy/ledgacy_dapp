import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

import {Secret} from './Secret.js'
import {AddSecret} from './AddSecret.js'
import {hexToAscii} from "oo7-parity";
import sjcl from 'sjcl';
import {deployed_ledgacy_contract} from '../../utils/deployed_ledgacy_contract.js'
import EthCrypto from 'eth-crypto';
import {splitAndPersistMasterKeySnippets} from '../../utils/key_splitting.js'
import {fetchMasterKey} from '../../utils/fetch_master_key.js';
import {getAccounts} from "../../utils/get_accounts";


class SecretsList extends Component {
    fetchSecretsInterval;

    constructor() {
        super()
        this.state = {
            secrets: [],
            loaded: false,
            masterkey: null
        }
    }

    componentDidMount = async () => {
        // attempt to load secrets from the blockchain
        // and decrypt it using private key.
        this.setState({...this.state, loaded: true})

        await this.fetchSecrets();
        this.fetchSecretsInterval = setInterval(this.fetchSecrets, 2000);
    }

    componentWillUnmount = () => {
        window.clearInterval(this.fetchSecretsInterval);
    }


    fetchSecrets = async () => {
        let master_key = this.props.masterkey;
        if (!master_key) {
            master_key = await fetchMasterKey(this.props.keypair.private);
        }



        let target = this.props.address ? this.props.address : (await getAccounts())[0];

        const deployedContract = await deployed_ledgacy_contract();
        let nSecrets = await deployedContract.secretsCountForAddress(target);
        if (nSecrets === this.state.secrets.length)
            return;
        let secrets = []
        for (let index = 0; index < nSecrets; ++index) {
            let result = await deployedContract.readSecretForAddress.call(index, target);

            const encrypted_secret = hexToAscii(result);
            const secret_str = sjcl.decrypt(master_key, encrypted_secret);
            const secret = JSON.parse(secret_str);
            secrets.push(secret);
        }
        this.setState({...this.state, secrets: secrets, masterkey: master_key});
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


        return (
            <Table celled fixed>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Secret</Table.HeaderCell>
                        <Table.HeaderCell>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tableBody}
                    {this.props.readonly ? null : <AddSecret
                        masterkey={this.state.masterkey}
                        saveHandle={this.fetchSecrets}
                        nSecrets={this.state.secrets.length}
                    />}
                </Table.Body>
            </Table>
        );
    }
}

export {SecretsList}

import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

import {hexToAscii} from "oo7-parity";
import EthCrypto from 'eth-crypto';
import {AddKeypart} from "./AddKeypart";
import {Keypart} from "./Keypart";
import {DecryptKeypart} from "./DecryptKeypart";

const decryptMasterKey = async (encrypted_master_key, ledgacy_private_key) => {
    const decoded_key = JSON.parse(hexToAscii(encrypted_master_key));
    return await EthCrypto.decryptWithPrivateKey(ledgacy_private_key, decoded_key);
}

class KeypartList extends Component {
    fetchSecretsInterval;
    constructor() {
        super()
        this.state = {
            keyparts: []
        }
    }

    componentWillReceiveProps(props) {
        if (props.keyparts) {
            this.setState({...this.state, keyparts: props.keyparts});
        }

    }

    addKeypart = (keypart) => {
        console.log("Adding keypart to state", this.state)
        this.state.keyparts.push(keypart);

        this.setState({...this.state, keyparts: this.state.keyparts});
    }

    render = () => {
        console.log("Rendering keyparts", this.state.keyparts)
        const tableBody = this.state.keyparts.map((keypart, index) => {
            return <Keypart key={index} keypart={keypart}/>
        })



        // <List divided relaxed>
        // { this.state.loaded ? secretsList : "Loading list of secrets..."}
        // </List>


        return (
            <div>
                {this.props.readonly && this.state.keyparts.length === 0 ? null :
                <Table celled>
                    <tbody>
                        <Table.Row>
                            <Table.HeaderCell>KeyPart</Table.HeaderCell>
                            <Table.HeaderCell>
                            </Table.HeaderCell>
                        </Table.Row>
                        {tableBody}
                        {this.props.readonly ? null : <AddKeypart
                            saveHandle={this.addKeypart}
                        />}
                    </tbody>
                </Table>}
                {this.props.readonly? null : <DecryptKeypart keyparts={this.state.keyparts} masterKeyHandle={this.props.masterKeyHandle}/>}
            </div>
        );
    }
}
export {KeypartList}

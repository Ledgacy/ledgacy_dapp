import React, {Component} from 'react';

import {asciiToHex} from 'oo7-parity';

import {Table, Input, Button} from 'semantic-ui-react';
import sjcl from 'sjcl';
import {getAccounts} from "../../utils/get_accounts";
import {deployed_ledgacy_contract} from '../../utils/deployed_ledgacy_contract.js';


const initial_state = {
    content: ''
}

class AddKeypart extends Component {
    // ledgacyContract;

    constructor() {
        super()
        this.state = initial_state
    }

    changeContent = (event, content) => {
        this.setState({...this.state, content: content.value})
    }

    propagateKeypart = () => {
        this.props.saveHandle(this.state.content);
        this.setState({...this.state, content: ''});
    }

    render = () => {
        if(this.props.masterkey === null){
            return '';
        }
        return ([
                <Table.Row key={1}>
                    <Table.Cell>
                        <Input fluid placeholder='KeyPart' onChange={this.changeContent} disabled={this.state.saving} value={this.state.content}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Button onClick={this.propagateKeypart}>Add keypart!</Button>
                    </Table.Cell>
                </Table.Row>
        ])
    }
}
export {AddKeypart}

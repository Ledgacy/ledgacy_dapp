import React, {Component} from 'react';

import {Table, Input, Button} from 'semantic-ui-react';
import {Rspan} from 'oo7-react';
import {combineKeyparts} from "../../utils/key_splitting";


const initial_state = {
    decryptedKey: ''
}

class DecryptKeypart extends Component {
    // ledgacyContract;

    constructor() {
        super()
        this.state = initial_state
    }

    combineKeyparts = async() => {
        let keyparts = this.props.keyparts;


        let secret = combineKeyparts(keyparts)
        this.setState({...this.state, decryptedKey: secret});
        console.log(secret);
    }

    render = () => {
        return ([
            <div>
                <Button onClick={this.combineKeyparts}>Decrypt</Button>
                <Rspan>Decrypted Key: {this.state.decryptedKey}</Rspan>
            </div>
        ])
    }
}

export {DecryptKeypart};

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


        let result = combineKeyparts(keyparts)
        let exitcode = result[0];

        if (exitcode !== 0) {
            console.log("Combining keyparts failed", exitcode);
            return;
        }
        let secret = "0x" + result[1];
        let address = result[2];

        this.setState({...this.state, decryptedKey: secret});
        console.log(secret);
        // TODO: Add address
        this.props.masterKeyHandle(secret, address);
    }

    render = () => {
        return ([
            <div>
                <Button onClick={this.combineKeyparts}>Decrypt</Button>
                {this.state.decryptedKey ? <Rspan>Decrypted Key: {this.state.decryptedKey}</Rspan> : null}
            </div>
        ])
    }
}

export {DecryptKeypart};

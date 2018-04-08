import React, {Component} from 'react';
import {Container, Header} from 'semantic-ui-react';
import {deployed_ledgacy_contract} from '../../utils/deployed_ledgacy_contract.js'
import {decryptKeypart} from "../../utils/key_splitting";
import {KeypartList} from "../recovery/KeypartList";


class NotificationsPage extends Component {
    readKeyPartsInterval;
    constructor(){
        super();
        this.state = {};
    }

    componentDidMount = async () => {
        // attempt to load secrets from the blockchain
        // and decrypt it using private key.
        this.readKeyparts();
        this.readKeyPartsInterval = setInterval(this.readKeyparts, 2000);
    }

    componentWillUnmount = () => {
        clearInterval(this.readKeyPartsInterval);
    }

    readKeyparts = async () => {
        const deployedContract = await deployed_ledgacy_contract();

        let nKeyshares = (await deployedContract.getEncryptedKeypartCount()).toNumber();

        console.log("Number of keyshares", nKeyshares)
        let keyshares = []
        for (let index = 0; index < nKeyshares; ++index) {
            let result = await deployedContract.getEncryptedKeypart.call(index);
            console.log("Decrypting keypart")
            try {
                const keyshare_str = await decryptKeypart(result, this.props.keypair.private);
                keyshares.push(keyshare_str);
            } catch(e) {
                console.log("Keyshare is not ours", e);
            }

        }

        console.log("All keyshares", keyshares);
        this.setState({...this.state, keyshares: keyshares});
    }


    render = () => {
        return (
            <Container>
                <Header as='header'>Notifications
                    <Header.Subheader></Header.Subheader>
                </Header>
                <KeypartList keyparts={this.state.keyshares} checkMessages={true} readonly={true}/>
            </Container>
        )
    }
}

export {NotificationsPage}

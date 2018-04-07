import React, {Component} from 'react';
/* import { Container, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';*/

import {Container, Header} from 'semantic-ui-react';
import {KeypartList} from "../recovery/KeypartList";
import {SecretsList} from "../secrets/SecretsList";


class RecoveryPage extends Component {
    constructor(){
        super();
        this.state = {};
    }

    showSecrets = (masterKey, address) => {
      this.setState({...this.state, masterKey: masterKey, address: address});
      console.log("Showing secrets for master key: ")
    };


    render = () => {
        return (
            <Container>
                <Header as='header'>Recovery</Header>
                <KeypartList masterKeyHandle={this.showSecrets}/>
                {this.state.masterKey && this.state.address ? <SecretsList masterkey={this.state.masterKey} address={this.state.address}/> : null}
            </Container>
        )
    }
}

export {RecoveryPage}

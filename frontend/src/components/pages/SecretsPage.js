import React, {Component} from 'react';
import { Container, Header } from 'semantic-ui-react';
import {SecretsList} from '../secrets/SecretsList.js'


class SecretsPage extends Component {
    constructor(){
        super();
        this.state = {};
    }

    render = () => {
        console.log("SecretsPage", this.props)
        return (
            <Container>
            <Header as='header'>Secrets</Header>
            <SecretsList keypair={this.props.keypair} />
            </Container>
        )
    }
}

export {SecretsPage}

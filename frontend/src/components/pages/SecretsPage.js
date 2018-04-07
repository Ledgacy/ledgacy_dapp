import React, {Component} from 'react';
import { Container, Header } from 'semantic-ui-react';
import {SecretsList} from '../secrets/SecretsList.js'


class SecretsPage extends Component {
    constructor(){
        super();
        this.state = {};
    }

    render = () => {
        return (
            <Container fluid>
            <Header as='header'>Secrets</Header>
            <SecretsList keypair={this.props.keypair} />
            </Container>
        )
    }
}

export {SecretsPage}

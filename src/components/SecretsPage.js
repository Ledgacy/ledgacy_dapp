import React, {Component} from 'react';
import { Container, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import {SecretsList} from './SecretsList.js'


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

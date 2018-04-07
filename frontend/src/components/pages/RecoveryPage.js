import React, {Component} from 'react';
/* import { Container, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';*/

import {Container, Header} from 'semantic-ui-react';
import {KeypartList} from "../recovery/KeypartList";


class RecoveryPage extends Component {
    constructor(){
        super();
        this.state = {};
    }

    render = () => {
        return (
            <Container fluid>
                <Header as='header'>Recovery</Header>
                <KeypartList/>
            </Container>
        )
    }
}

export {RecoveryPage}

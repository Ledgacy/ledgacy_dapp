import React, {Component} from 'react';
/* import { Container, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';*/

import {Container, Header} from 'semantic-ui-react';


class TrusteesPage extends Component {
    constructor(){
        super();
        this.state = {};
    }

    render = () => {
        return (
            <Container fluid>
                <Header as='header'>Trustee Management</Header>
                <div>This page is still empty.</div>
            </Container>
        )
    }
}

export {TrusteesPage}

import React, {Component} from 'react';
import { Container, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';


class StatusPage extends Component {
    constructor(){
        super();
        this.state = {};
    }

    render = () => {
        return (
            <Container fluid>
                <Header as='header'>Status</Header>
                <div>This page is still empty.</div>
            </Container>
        )
    }
}

export {StatusPage}

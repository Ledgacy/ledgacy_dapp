import React, {Component} from 'react'
import { Tab } from 'semantic-ui-react'
import { Container, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import {SecretsList} from './SecretsList.js'

/* import SecretsPage from './SecretsPage.js';
 * import TrusteesPage from './TrusteesPage.js';
 * import NotificationsPage from './NotificationsPage.js';*/

import logo from '../ledgacy_logo.svg';

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
currentPage: 'secrets'
        }
    }

    changePage = (page) => {
        this.setState({...this.state, currentPage: page})
    }

    render = () => {

        let page;
            if(this.state.currentPage == 'secrets'){
                page = (
                    <Container fluid>
                    <Header as='header'>Secrets</Header>
                    <SecretsList />
                    </Container>
                )
                /* page = <SecretsPage />;*/
            }else if(this.state.currentPage === 'trustees'){
                page = <div>This page is still empty.</div>
                /* page = <TrusteesPage />;*/
            }else{
                page = <div>This page is still empty.</div>
                /* page = <NotificationsPage />;*/
            }


        return (
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='push' width='thin' visible={true} icon='labeled' vertical inverted pointing>
                        <Menu.Item name='home'>
                            <img src={logo} className="App-menu-logo" alt="logo" />
                        </Menu.Item>
                        <Menu.Item name='secrets' active={this.state.currentPage === 'secrets'} onClick={this.changePage}>
                            <Icon name='unlock alternate' />
                            Secrets
                        </Menu.Item>
                        <Menu.Item name='trustees' active={this.state.currentPage === 'trustees'} onClick={this.changePage}>
                            <Icon name='protect' />
                            Trustees
                        </Menu.Item>
                        <Menu.Item name='notifications' active={this.state.currentPage === 'notifications'} onClick={this.changePage}>
                            <Icon name='mail outline' />
                            Notifications
                        </Menu.Item>
                        <Menu.Item name='signout' className='signout' onClick={this.props.handleSignOut}>
                            <Icon name='power' />
                            Sign Out
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>
                            {page}
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
        );
    }
}

export {Dashboard};

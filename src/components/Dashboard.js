import React, {Component} from 'react'
import { Tab } from 'semantic-ui-react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import {SecretsList} from './SecretsList.js'


import logo from '../ledgacy_logo.svg';

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
currentPage: 'secrets'
        }
    }

    render = () => {
        return (
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='push' width='thin' visible={true} icon='labeled' vertical inverted pointing>
                        <Menu.Item name='home'>
                            <img src={logo} className="App-menu-logo" alt="logo" />
                        </Menu.Item>
                        <Menu.Item name='secrets' active={this.state.currentPage === 'secrets'}>
                            <Icon name='unlock alternate' />
                            Secrets
                        </Menu.Item>
                        <Menu.Item name='trustees' active={this.state.currentPage === 'trustees'}>
                            <Icon name='protect' />
                            Trustees
                        </Menu.Item>
                        <Menu.Item name='notifications' active={this.state.currentPage === 'notifications'}>
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
                            <Header as='header'>

                            </Header>
                            <SecretsList />
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>

        );
    }
}

export {Dashboard};

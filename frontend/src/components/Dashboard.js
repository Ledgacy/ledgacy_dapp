import React, {Component} from 'react'
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';

import {SecretsPage} from './pages/SecretsPage.js';
import {StatusPage} from './pages/StatusPage.js';
import {TrusteesPage} from './pages/TrusteesPage.js';
import {NotificationsPage} from './pages/NotificationsPage.js';

import logo from '../ledgacy_logo.svg';
import {RecoveryPage} from "./pages/RecoveryPage";

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
currentPage: 'secrets'
        }
    }

    changePage = (page) => {
        console.log(page, this.state);
        this.setState({...this.state, currentPage: page})
    }

    render = () => {

        let page;
            if(this.state.currentPage === 'secrets'){
                page = <SecretsPage keypair={this.props.keypair}/>;
            }else if(this.state.currentPage === 'status'){
                page = <StatusPage />;
            }else if(this.state.currentPage === 'recovery'){
                page = <RecoveryPage />;
            }else if(this.state.currentPage === 'trustees'){
                page = <TrusteesPage />;
            }else{
                page = <NotificationsPage />;
            }

        return (
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='push' width='thin' visible={true} icon='labeled' vertical inverted >
                        <Menu.Item name='home'>
                            <img src={logo} className="App-menu-logo" alt="logo" />
                        </Menu.Item>
                        <Menu.Item>
                            <em>{this.props.profileName}</em>
                        </Menu.Item>
                        <Menu.Item name='secrets' active={this.state.currentPage === 'secrets'} onClick={() => this.changePage('secrets')}>
                            <Icon name='unlock alternate' />
                            Secrets
                        </Menu.Item>
                        <Menu.Item name='status' active={this.state.currentPage === 'status'} onClick={() => this.changePage('status')}>
                            <Icon name='info circle' />
                            Status
                        </Menu.Item>
                        <Menu.Item name='trustees' active={this.state.currentPage === 'trustees'} onClick={() => this.changePage('trustees')}>
                            <Icon name='protect' />
                            Trustees
                        </Menu.Item>
                        <Menu.Item name='recovery' active={this.state.currentPage === 'recovery'} onClick={() => this.changePage('recovery')}>
                            <Icon name='magic' />
                            Recovery
                        </Menu.Item>
                        <Menu.Item name='notifications' active={this.state.currentPage === 'notifications'} onClick={() => this.changePage('notifications')}>
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

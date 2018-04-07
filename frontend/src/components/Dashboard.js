import React, {Component} from 'react'
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';

import {SecretsPage} from './pages/SecretsPage.js';
import {StatusPage} from './pages/StatusPage.js';
import {TrusteesPage} from './pages/TrusteesPage.js';
import {NotificationsPage} from './pages/NotificationsPage.js';
import {ActivatableMenuItem} from './ActivatableMenuItem.js';

import logo from '../ledgacy_logo.svg';
import {RecoveryPage} from "./pages/RecoveryPage";


import {Howl} from 'howler';
import menu_soundfile from './pop.mp3';
const menu_sound = new Howl({
    src: [menu_soundfile],
    volume: 0.3
});
console.log('MENU SOUND:', menu_sound);
window.menu_sound = menu_sound

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
currentPage: 'secrets'
        }
    }

    changePage = (page) => {
        console.log(page, this.state);
        menu_sound.play();
        this.setState({...this.state, currentPage: page})
    }

    renderPage = () => {
            if(this.state.currentPage === 'secrets'){
                console.log("Dashboard", this.props)
                return <SecretsPage keypair={this.props.keypair}/>;
            }else if(this.state.currentPage === 'status'){
                return <StatusPage keypair={this.props.keypair} />;
            }else if(this.state.currentPage === 'recovery'){
                return <RecoveryPage />;
            }else if(this.state.currentPage === 'trustees'){
                return <TrusteesPage keypair={this.props.keypair} />;
            }else{
                return <NotificationsPage keypair={this.props.keypair} />;
            }
    }

    render = () => {
        return (
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='push' width='thin' visible={true} icon='labeled' vertical inverted >
                        <Menu.Item name='home'>
                            <img src={logo} className="App-menu-logo" alt="logo" />
                        </Menu.Item>
                        <Menu.Item>
                            <em>{this.props.profileName}</em>
                        </Menu.Item>
                        <ActivatableMenuItem name='status' iconName='info circle' currentPage={this.state.currentPage}  changePage={this.changePage}>Status</ActivatableMenuItem>
                        <ActivatableMenuItem name='secrets' iconName='unlock alternate' currentPage={this.state.currentPage} changePage={this.changePage} >Secrets</ActivatableMenuItem>
                        <ActivatableMenuItem name='trustees' iconName='protect' currentPage={this.state.currentPage} changePage={this.changePage} >Trustees</ActivatableMenuItem>
                        <ActivatableMenuItem name='notifications' iconName='mail outline' currentPage={this.state.currentPage} changePage={this.changePage}>Notifications</ActivatableMenuItem>
                        <ActivatableMenuItem name='recovery' iconName='magic' currentPage={this.state.currentPage} changePage={this.changePage} >Recovery</ActivatableMenuItem>
                        <ActivatableMenuItem name='signout' iconName='power' currentPage={this.state.currentPage} onClick={this.props.handleSignOut} >Sign Out</ActivatableMenuItem>

                    </Sidebar>
                    <Sidebar.Pusher>
                        {this.renderPage()}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
        );
    }
}

export {Dashboard};

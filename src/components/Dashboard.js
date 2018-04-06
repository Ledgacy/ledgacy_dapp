import React, {Component} from 'react'
import { Tab } from 'semantic-ui-react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';


/* const panes = [
 *     {menuItem: 'Ledgacy', render: () => <Menu.Item header>Ledgacy</Menu>}
 *   { menuItem: 'Tab 1', render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane> },
 *   { menuItem: 'Tab 2', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
 *   { menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
 * ]*/

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render = () => {
        return (
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='push' width='thin' visible={true} icon='labeled' vertical inverted pointing>
                        <Menu.Item name='home'>
                            <Icon name='home' />
                            Home
                        </Menu.Item>
                        <Menu.Item name='unlock alternate'>
                            <Icon name='unlock alternate' />
                            Secrets
                        </Menu.Item>
                        <Menu.Item name='protect'>
                            <Icon name='protect' />
                            Trustees
                        </Menu.Item>
                        <Menu.Item name='notification'>
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
                            <Header as='h3'>Application Content</Header>
                            <Image src='/assets/images/wireframe/paragraph.png' />
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
        );
    }
}

export {Dashboard};

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
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='push' width='thin' visible={true} icon='labeled' vertical inverted>
                        <Menu.Item name='home'>
                            <Icon name='home' />
                            Home
                        </Menu.Item>
                        <Menu.Item name='gamepad'>
                            <Icon name='gamepad' />
                            Games
                        </Menu.Item>
                        <Menu.Item name='camera'>
                            <Icon name='camera' />
                            Channels
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>
                            <Header as='h3'>Application Content</Header>
                            <Image src='/assets/images/wireframe/paragraph.png' />
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

export {Dashboard};

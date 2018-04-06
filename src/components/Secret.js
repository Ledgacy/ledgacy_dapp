import React, {Component} from 'react'
import {List, Table, Input, Button, Icon} from 'semantic-ui-react'


class Secret extends Component {
    constructor() {
        super()
        this.state = {
            hidden: true
        }
    }

    componentDidMount = () =>{
        // attempt to load secrets from the blockchain
    }

    toggleHidden = () => {
        this.setState({...this.state, hidden: !this.state.hidden})
    }

    render = () => {
        return (
            // <List.Item>
            //     <List.Icon name='chevron right' size='large' verticalAlign='middle' />
            //     <List.Content>
            //         <List.Header as='h3'>{this.props.secret.name}</List.Header>
            //         <List.Description as='a'>
            //             {this.props.secret.content}
            //         </List.Description>
            //     </List.Content>
            // </List.Item>
                <Table.Row>
                <Table.Cell>
                    {this.props.secret.name}
                </Table.Cell>
                <Table.Cell>
                    <Input fluid
                        value={this.state.hidden ? 'aaaaaaaaaaaaaaaa' : this.props.secret.content}
                        type={this.state.hidden ? 'password' : 'text'}
                        actionPosition='left'
            action={<Button icon={<Icon name='eye' onClick={this.toggleHidden} />} attached='left' />}
                    />
                </Table.Cell>
                <Table.Cell>
                </Table.Cell>
                </Table.Row>
        );
    }
}

export {Secret};

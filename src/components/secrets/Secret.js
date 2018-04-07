import React, {Component} from 'react'
import {Table, Input, Button, Icon} from 'semantic-ui-react'


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
            <Table.Row>
                <Table.Cell>
                    {this.props.secret.name}
                </Table.Cell>
                <Table.Cell>
                    <Input fluid
                           value={this.state.hidden ? 'aaaaaaaaaaaaaaaa' : this.props.secret.content}
                           type={this.state.hidden ? 'password' : 'text'}
                           actionPosition='left'
                           action={<Button onClick={this.toggleHidden} icon={<Icon name={this.state.hidden ? 'eye' : 'hide'} />} attached='left' color={this.state.hidden ? 'grey' : 'red' }/>}
                    />
                </Table.Cell>
                <Table.Cell>
                </Table.Cell>
            </Table.Row>
        );
    }
}

export {Secret};

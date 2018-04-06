import React, {Component} from 'react'
import {List, Table} from 'semantic-ui-react'


class Secret extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    componentDidMount = () =>{
        // attempt to load secrets from the blockchain
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
                    {this.props.secret.content}
                </Table.Cell>
                </Table.Row>
        );
    }
}

export {Secret};

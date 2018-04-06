import React, {Component} from 'react'
import {List, Table} from 'semantic-ui-react'

import {Secret} from './Secret.js'


class SecretsList extends Component {
    constructor() {
        super()
        this.state = {
            secrets: [{name: 'foo', content: 'bar'}, {name: 'geheim', content: 'ik hou van koekjes'}],
            loaded: false,
        }
    }

    componentDidMount = () =>{
        // attempt to load secrets from the blockchain
        // and decrypt it using private key.
        this.setState({...this.state, loaded: true})
    }

    render = () => {
        const secretsList = this.state.secrets.map(secret => {
            return <Secret secret={secret} />
        })

        const tableBody = this.state.loaded ? secretsList : (
                <Table.Row>
                <Table.Cell>
                Loading list of secrets...
                </Table.Cell>
                </Table.Row>
        )

        // <List divided relaxed>
        // { this.state.loaded ? secretsList : "Loading list of secrets..."}
        // </List>


        return (
                <Table celled>
                <Table.Row>
                <Table.HeaderCell>Key</Table.HeaderCell>
                <Table.HeaderCell>Secret</Table.HeaderCell>
                </Table.Row>
                {tableBody}
            </Table>
        );
    }
}
export {SecretsList}

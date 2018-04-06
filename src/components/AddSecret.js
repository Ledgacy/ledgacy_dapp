import React, {Component} from 'react'
import {List, Table, Input, Button} from 'semantic-ui-react'


class AddSecret extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            content: '',
            submitted: false,
            saving: false,
        }
    }

    changeContent = (event, content) => {
        this.setState({...this.state, content: content.value})
    }


    changeName = (event, name) => {
        this.setState({...this.state, name: name.value})
    }

    saveToBlockchain = () => {
        this.setState({...this.state, saving: true})
        console.log("TODO! storing this secret to the blockchain!", this.state.name, this.state.content);
    }

    render = () => {
        return (
                <Table.Row>
                <Table.Cell>
                <Input fluid placeholder='Name' onChange={this.changeName} disabled={this.state.saving}/>
                </Table.Cell>
                <Table.Cell>
                <Input fluid placeholder='Secret' onChange={this.changeContent} disabled={this.state.saving}/>
                </Table.Cell>
                <Table.Cell>
                <Button onClick={this.saveToBlockchain} disabled={this.state.saving} >{ this.state.saving? "Saving..." : "Save!"}</Button>
                </Table.Cell>
                </Table.Row>
        )
    }
}
export {AddSecret}

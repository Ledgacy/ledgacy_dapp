import React, {Component} from 'react'
import {Table, Input, Button, Icon} from 'semantic-ui-react'


class Keypart extends Component {
    constructor() {
        super()
        this.state = {
            hidden: true
        }
    }

    render = () => {
        return (
            <Table.Row>
                <Table.Cell>
                    {this.props.keypart}
                </Table.Cell>
                <Table.Cell>
                </Table.Cell>
            </Table.Row>
        );
    }
}

export {Keypart};

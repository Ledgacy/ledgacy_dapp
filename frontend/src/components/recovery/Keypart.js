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
                <Table.Cell className='Keypart-keypart'>
                    {this.props.keypart}
                </Table.Cell>
                <Table.Cell collapsing>
                    <Button icon onClick={this.props.removeKeypart}>
                        <Icon name='close' />
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    }
}

export {Keypart};

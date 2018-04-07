import React, {Component} from 'react'
import {Table, Input, Button, Icon, Message} from 'semantic-ui-react'
import {deployed_ledgacy_contract} from "../../utils/deployed_ledgacy_contract";


class Keypart extends Component {

    constructor() {
        super()
        this.state = {
            hidden: true,
            warning: null
        }

        setInterval(this.checkWarning, 1000);
    }

    checkWarning = async() => {
        console.log("Checking for messages")
        let keypart = JSON.parse(this.props.keypart);
        let target = keypart.address;
        const deployedContract = await deployed_ledgacy_contract();
        let messageCount = (await deployedContract.getMessageCount(target)).toNumber();
        console.log("Found this many messages: ", messageCount);
        if (messageCount > 0) {
            console.log("Issuing warning")
            let warning = (<Message visible warning>
                <Message.Header>Help, I lost my key!</Message.Header>
            </Message>);
            this.setState({...this.state, warning: warning});
        }
    }

    render = () => {
        return (
            <Table.Row>
                <Table.Cell className='Keypart-keypart'>
                    {this.props.keypart}
                </Table.Cell>
                <Table.Cell collapsing>
                    {this.props.checkMessages ? this.state.warning : null}
                    {this.props.readonly ? null : <Button icon onClick={this.props.removeKeypart}>
                        <Icon name='close' />
                    </Button>}
                </Table.Cell>
            </Table.Row>
        );
    }
}

export {Keypart};

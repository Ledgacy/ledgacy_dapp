import React, {Component} from 'react';
import { Container, Button, Header, Message, Segment, } from 'semantic-ui-react';
import {bonds} from "../../utils/bonds_setup";
import {Rspan} from 'oo7-react';
import timeago from 'timeago.js';
import {getAccounts} from "../../utils/get_accounts";
import {deployed_ledgacy_contract} from '../../utils/deployed_ledgacy_contract.js'
import {hexToAscii} from "oo7-parity";
import sjcl from "sjcl";
import {decryptKeypart} from "../../utils/key_splitting";
import {KeypartList} from "../recovery/KeypartList";


class StatusPage extends Component {
    getLastTimeInterval;
    constructor(){
        super();
        this.state = {lastTime: 0, keyshares: []};
        this.block_bond = bonds.findBlock(bonds.blockNumber)
    }

    componentDidMount = async () =>{
        await this.getLastTime();
        this.getLastTimeInterval = setInterval(this.getLastTime, 2000);
    }

    componentWillUnmount = () => {
        clearInterval(this.getLastTimeInterval);
    }

    getLastTime = async () => {
        const deployedContract = await deployed_ledgacy_contract();
        let lastTime = await deployedContract.getLastTime();
        console.log("LastBlock", lastTime.toNumber())
        this.setState({...this.state, lastTime: lastTime.toNumber()});
    }

    checkIn = async () => {
        const deployedContract = await deployed_ledgacy_contract();
        const accounts = await getAccounts();
        await deployedContract.alive({from: accounts[0]});
        console.log("Signalled liveness");
    }

    lastDateTime = () => {
        return new Date(this.state.lastTime * 1000)
    }

    longInactivityDate = () => {
        return (Date.now() - 1000 * 60);
    }


    render = () => {
        let warningMessage = null;
        if(this.lastDateTime() < this.longInactivityDate()){
            warningMessage = (<Message warning>
                <Message.Header>It has been very long since you have made yourself known on the blockchain
                </Message.Header>
                <p>
                    You should check in now to make sure all your trustees know that you are alive and well.</p>
            </Message>);
        }

        return (
            <Container>
                <Header as='header'>Status</Header>
                <Segment.Group>
                    <Segment>
                        <Header dividing>Activity</Header>
                    <div>
                        {warningMessage}
                        <Rspan>You were last active: <strong title={this.lastDateTime().toString()}>{timeago().format(this.lastDateTime())}</strong>.</Rspan></div>
                    <div><Rspan>Current blocktime: {this.block_bond.timestamp.map((timestamp) => timestamp.toISOString())}
                    </Rspan>
                    <Button onClick={this.checkIn}>Check in now!</Button>
                    </div>
                </Segment>
                <Segment.Group horizontal>
                    <Segment>a</Segment>
                    <Segment>b</Segment>
                    <Segment>c</Segment>
                </Segment.Group>
                </Segment.Group>
            </Container>
        )
    }
}

export {StatusPage}

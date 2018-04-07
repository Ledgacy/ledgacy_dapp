import React, {Component} from 'react';
import { Container, Button, Header } from 'semantic-ui-react';
import {bonds} from "../../utils/bonds_setup";
import {Rspan} from 'oo7-react';
import {getAccounts} from "../../utils/get_accounts";
import {deployed_ledgacy_contract} from '../../utils/deployed_ledgacy_contract.js'
import {hexToAscii} from "oo7-parity";
import sjcl from "sjcl";
import {decryptKeypart} from "../../utils/key_splitting";
import {KeypartList} from "../recovery/KeypartList";


class StatusPage extends Component {
    getLastTimeInterval;
    /* readKeyPartsInterval;*/
    constructor(){
        super();
        this.state = {lastTime: 0, keyshares: []};
        this.block_bond = bonds.findBlock(bonds.blockNumber)
    }

    componentDidMount = async () =>{
        await this.getLastTime();
        this.getLastTimeInterval = setInterval(this.getLastTime, 2000);
        /* this.readKeyPartsInterval = setInterval(this.readKeyparts, 2000);*/
    }

    componentWillUnmount = () => {
        clearInterval(this.getLastTimeInterval);
        /* clearInterval(this.readKeyPartsInterval);*/
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


    render = () => {
        return (
            <Container fluid>
                <Header as='header'>Status</Header>
                <div>
                    <Rspan>Last block: {new Date(this.state.lastTime*1000).toString()}. Current block: {this.block_bond.timestamp.map((timestamp) => timestamp.toString())}
                    </Rspan>
                    <Button onClick={this.checkIn}>Check in!</Button>
                </div>
            </Container>
        )
    }
}

export {StatusPage}

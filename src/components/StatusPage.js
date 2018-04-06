import React, {Component} from 'react';
import { Container, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import {hexToAscii} from "oo7-parity";
import {web3, bonds} from "../bonds_setup";
import * as contract from "truffle-contract";
import {Rspan} from 'oo7-react';
import LedgacyContract from '../contracts/Ledgacy.json';


class StatusPage extends Component {

    constructor(){
        super();
        this.state = {lastTime: 0};
        this.blocktime_bond = bonds.time
    }

    componentDidMount = async () =>{
        // attempt to load secrets from the blockchain
        // and decrypt it using private key.
        this.ledgacyContract = contract(LedgacyContract);
        this.ledgacyContract.setProvider(web3.currentProvider);

        await this.getLastTime();
        setInterval(this.getLastTime, 2000);
    }

    getLastTime = async () => {
        const deployedContract = await this.ledgacyContract.deployed();
        let lastTime = await deployedContract.getLastTime();
        console.log("LastBlock", lastTime.toNumber())
        this.setState({...this.state, lastTime: lastTime.toNumber()});
        //console.log('secrets', secrets);
    }

    checkIn = async () => {
        const deployedContract = await this.ledgacyContract.deployed();
        await deployedContract.alive({from: web3.eth.accounts[0]});
        console.log("Signalled liveness");
    }

    render = () => {
        return (
            <Container fluid>
                <Header as='header'>Status</Header>
                <div>
                    <Rspan>Last block: {this.state.lastTime}. Current block: {this.blocktime_bond}
                    </Rspan>
                    <Button onClick={this.checkIn}>Check in!</Button>
                </div>
            </Container>
        )
    }
}

export {StatusPage}

import React, {Component} from 'react';
import _ from 'lodash';

import {Container, Header, Input, Button, Table, Message, Form} from 'semantic-ui-react';
import {TrusteeField} from '../TrusteeField.js';
import {splitAndPersistMasterKeySnippets} from "../../utils/key_splitting.js";
import {fetchMasterKey} from '../../utils/fetch_master_key.js';
import {get_profiles} from '../../utils/get_profiles.js';
import {getAccounts} from "../../utils/get_accounts";

class TrusteesPage extends Component {
    constructor(){
        super();
        this.state = {
            trustees: [],
            threshold: 0,
            potential_trustees: [],
        };
    }

    componentDidMount = async () => {
        let potential_trustees = [{
            name: 'Wiebe-Marten Wijnja',
            pubkey: 'a8bf05d3ff8661ca28a5bf2df7e5c4a78068c9e8e66ec194b212582e71172281582ccb7b69bb98e58fdfe70dfc6653b1aca104ce8a0cd32a319fad96a9ac2564',
            address: '0x00123321124342121233213123121212'
        }, {
            name: 'Pim Otte',
            pubkey: 'b8bf05d3ff8661ca28a5bf2df7e5c4a78068c9e8e66ec194b212582e71172281582ccb7b69bb98e58fdfe70dfc6653b1aca104ce8a0cd32a319fad96a9ac2564',
            address: '0x00sadf21124342121233213123121212'
        }, {
            name: 'APG',
            pubkey: 'c8bf05d3ff8661ca28a5bf2df7e5c4a78068c9e8e66ec194b212582e71172281582ccb7b69bb98e58fdfe70dfc6653b1aca104ce8a0cd32a319fad96a9ac2564',
            address: '0xdeadbeefoa9123urioezijk1123jksoa'
        }];

        potential_trustees = await get_profiles();

        this.setState({...this.state, potential_trustees: potential_trustees});
    }

    realTrustees = () => {
        return _.reject(this.state.trustees, (elem) => elem === null);
    }

    addTrusteeFields = () =>{
        this.state.trustees.push(null);
        this.setState(this.state);
    }

    handleTrusteeChange = (index, new_trustee, remark) => {
        if (new_trustee) {
            new_trustee.remark = remark;
        }

        this.state.trustees[index] = new_trustee;
        this.setState(this.state);
    }

    changeThreshold = (event, item) => {
        let threshold = +(item.value)
        if(isNaN(threshold))
            return;

        if(threshold > this.realTrustees().length)
            threshold = this.realTrustees().length;

        if(threshold < 0) {
            threshold = 0;
        }

        this.setState({...this.state, threshold: threshold})
    }

    storeTrustees = async () => {
        const master_key = await fetchMasterKey(this.props.keypair.private);
        // TODO
        console.log("Storing trustees:", this.state.trustees);
        const real_trustees = this.realTrustees();
        console.log('public keys', real_trustees);

        let accounts = await getAccounts()
        splitAndPersistMasterKeySnippets(master_key.substr(2), real_trustees, this.state.threshold, accounts[0]);
    }

    renderTrustees = () => {
        return this.state.trustees.map((trustee, index) => {
            return (
                <TrusteeField key={index} source={this.state.potential_trustees} handleTrusteeChange={(trustee, remark) => this.handleTrusteeChange(index, trustee, remark)}/>
            )
        });
    }

    render = () => {
        console.log(this.state, this.realTrustees());

        let warning = null;
        if(this.realTrustees().length < 1){
            warning = <Table.Row>
                <Table.Cell colSpan={2}>
                    <Message warning >
                        <Message.Header>You need to add at least one Trustee.</Message.Header>
                        <p>
                            To make sure your secrets are <em>really</em> safe from loss, you need to add at least one trustee (but multiple is strongly preferred!).
                        </p>
                    </Message>
                </Table.Cell>
            </Table.Row>
        }

        return (
            <Container>
                <Header as='header'>Trustee Management</Header>
                <Form>
                    <Table celled>
                        <tbody>
                            <Table.Row>
                                <Table.HeaderCell>
                                    Name
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Remark
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                   Address
                                </Table.HeaderCell>
                            </Table.Row>
                            {warning}
                            {this.renderTrustees()}
                        </tbody>
                    </Table>

                    <Form.Field>
                        <Button onClick={this.addTrusteeFields} >Add Trustee</Button>
                    </Form.Field>
                    <Form.Field>
                        <label title='minimum amount of keyshares required to regain key.'>Threshold </label>
                        <Input placeholder='3' onChange={this.changeThreshold} value={this.state.threshold}/>
                    </Form.Field>
                    <Form.Field>
                        <Button onClick={this.storeTrustees} disabled={this.state.threshold == 0 || this.state.threshold > this.realTrustees().length}>Store Trustees</Button>
                    </Form.Field>
                </Form>
            </Container>
        )
    }
}

export {TrusteesPage}

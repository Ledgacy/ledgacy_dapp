import React, {Component} from 'react';

import {Container, Header, Input, Button, Table} from 'semantic-ui-react';
import {TrusteeField} from '../TrusteeField.js';


class TrusteesPage extends Component {
    constructor(){
        super();
        this.state = {
            trustees: [],
            threshold: 0,
            potential_trustees: [],
        };
    }

    componentDidMount = () => {
        let potential_trustees = [{
            name: 'Wiebe-Marten Wijnja',
            address: '0x00123321124342121233213123121212'
        }, {
            name: 'Pim Otte',
            address: '0x00sadf21124342121233213123121212'
        }, {
            name: 'APG',
            address: '0xdeadbeefoa9123urioezijk1123jksoa'
        }];
        this.setState({...this.state, potential_trustees: potential_trustees});
    }

    addTrusteeFields = () =>{
        this.state.trustees.push({address: ''});
        this.setState(this.state);
    }

    handleTrusteeChange = (index, new_trustee) => {
        this.state.trustees[index] = new_trustee;
        this.setState(this.state);
    }

    changeThreshold = (event, item) => {
        let threshold = new Number(item.value)
        if(isNaN(threshold))
            return;

        if(threshold > this.state.trustees.length)
            threshold = this.state.trustees.length;

        if(threshold < 0) {
            threshold = 0;
        }

        this.setState({...this.state, threshold: threshold})
    }

    storeTrustees = () => {
        // TODO
        console.log("Storing trustees:", this.state.trustees);
    }

    renderTrustees = () => {
        return this.state.trustees.map((trustee, index) => {
            return (
                <TrusteeField key={index} source={this.state.potential_trustees} handleTrusteeChange={(trustee) => this.handleTrusteeChange(index, trustee)}/>
            )
        });
    }

    render = () => {
        console.log(this.state);
        return (
            <Container fluid>
                <Header as='header'>Trustee Management</Header>
                    <Table celled>
                        <tbody>
                            <Table.Row>
                                <Table.HeaderCell>
                                    Name
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                   Address
                                </Table.HeaderCell>
                            </Table.Row>
                    {this.renderTrustees()}
                        </tbody>
                    </Table>
                    <div>
                        <Button onClick={this.addTrusteeFields} >Add Trustee</Button>
                    </div>
                    <div>
                        <Input placeholder='3' onChange={this.changeThreshold} value={this.state.threshold}/>
                    </div>
                    <div>
                        <Button onClick={this.storeTrustees} disabled={this.state.threshold == 0 || this.state.threshold > this.state.trustees.length}>Store Trustees</Button>
                    </div>
            </Container>
        )
    }
}

export {TrusteesPage}

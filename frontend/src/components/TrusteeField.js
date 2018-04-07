import React, {Component} from 'react';
import _ from 'lodash';


import {Search, Grid, Table} from 'semantic-ui-react';

const initial_state = { isLoading: false, results: [], value: '' };
class TrusteeField extends Component {
    constructor(){
        super();
        // this.state = initial_state;
    }

    componentWillMount() {
        this.resetComponent();
    }

    resetComponent = () => {
        this.setState({
        isLoading: false,
        results: [],
        result: null,
        value: ''
        })
        this.props.handleTrusteeChange(null);
    }

    handleResultSelect = (e, { result }) => {
        console.log('asdlkf result', result);
        this.setState({
            value: result.title,
            result: result
        })
        this.props.handleTrusteeChange(result.elem);
}

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent();

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => re.test(result.name);

            this.setState({
                isLoading: false,
                results: _.filter(this.props.source, isMatch),
            });
        }, 300);
    }

    render = () => {
        const { isLoading, value, results } = this.state
        const renderedResults = results.map((elem, index) => {
            return {key: index, title: elem.name, description: elem.address, elem: elem};
        })

        return (
                <Table.Row>
                <Table.Cell>
                <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                    results={renderedResults}
                    value={value}
                />
                </Table.Cell>
                <Table.Cell>
                {(this.state.result !== null ? this.state.result.description : null)}
                </Table.Cell>
                </Table.Row>
        )
    }
}
export {TrusteeField}

import React, {Component} from 'react';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';



class ActivatableMenuItem extends Component {
    
    render = () => {
        return (
            <Menu.Item name={this.props.name} active={this.props.currentPage === this.props.name} onClick={() => this.props.onClick ? this.props.onClick() : this.props.changePage(this.props.name)}>
                <Icon name={this.props.iconName} />
                {this.props.children}
            </Menu.Item>
        );
    }
}

export {ActivatableMenuItem};

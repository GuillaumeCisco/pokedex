/**
 * Created by guillaume on 2/17/17.
 */
import React, {PropTypes} from 'react';
import {
    TableHeaderColumn,
} from 'material-ui/Table';

import {header} from '../style';

class OrderedHeaderColumn extends React.PureComponent {

    constructor(props) {
        super(props);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    onMouseUp() {
        this.props.setOrdering(this.props.column);
    }

    render() {
        const {column} = this.props;

        return (
            <TableHeaderColumn
                style={header}
                onMouseUp={this.onMouseUp}
            >
                {column.replace(/_/g, ' ')}
            </TableHeaderColumn>);
    }
}


OrderedHeaderColumn.propTypes = {
    column: PropTypes.string.isRequired,
    setOrdering: PropTypes.func.isRequired,
};

export default OrderedHeaderColumn;

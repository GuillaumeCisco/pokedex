/**
 * Created by guillaume on 10/12/16.
 */

import React, {PropTypes} from 'react';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import {
    TableRow,
} from 'material-ui/Table';

import RowColumn from './column';

import {row} from '../style';

const HOC = (Component = RowColumn) => {
    class Row extends React.Component {
        constructor(props) {
            super(props);
            this.select = this.select.bind(this);
        }

        select() {
            this.props.setItem(+this.props.item.url.split('/').slice(-2)[0]); // will change url in saga code
        }

        render() {
            const {columns, id, item} = this.props;

            return (
                <TableRow
                    key={`row_${item.name}`}
                    style={row}
                    onMouseUp={this.select}
                    selectable={false}
                >
                    {columns.map((column, j) =>
                        <Component
                            key={`column_${item.name}`}
                            id={id}
                            item={item}
                            column={column}
                        />,
                    )}
                </TableRow>);
        }
    }

    Row.propTypes = {
        id: PropTypes.number,
        columns: PropTypes.arrayOf(PropTypes.string).isRequired,
        item: PropTypes.shape({
            url: PropTypes.string,
        }).isRequired,
        setItem: PropTypes.func.isRequired,
    };

    Row.defaultProps = {
        id: null,
    };

    return onlyUpdateForKeys(['columns', 'id', 'item'])(Row);
};


export default HOC;

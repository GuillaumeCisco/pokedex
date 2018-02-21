/**
 * Created by guillaume on 10/12/16.
 */

import React, {PropTypes} from 'react';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import {TableRowColumn} from 'material-ui/Table';

import {rowColumn, selected} from '../style';

const RowColumn = ({id, item, column}) =>
    <TableRowColumn style={{...rowColumn, ...(item.id === id ? selected : null)}}>
        {item[column]}
    </TableRowColumn>;

RowColumn.propTypes = {
    id: PropTypes.number,
    item: PropTypes.shape({}).isRequired,
    column: PropTypes.string.isRequired,
};

RowColumn.defaultProps = {
    id: null,
};

export default onlyUpdateForKeys(['id', 'item', 'column'])(RowColumn);

/**
 * Created by guillaume on 10/12/16.
 */

import React, {PropTypes} from 'react';
import {format} from 'date-fns';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import {TableRowColumn} from 'material-ui/Table';

import {selected} from '../../../../../components/table/style';

const RowColumn = ({id, item, column}) =>
    <TableRowColumn style={+item.url.split('/').slice(-2)[0] === id ? selected : null}>
        {column === 'date' ? format(item[column], 'DD/MM/YYYY') : item[column]}
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

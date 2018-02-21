/**
 * Created by guillaume on 2/17/17.
 */
import React, {PropTypes} from 'react';
import {
    TableHeaderColumn,
} from 'material-ui/Table';

import {header} from '../style';

const HeaderColumn = ({column}) =>
    <TableHeaderColumn style={header}>
        {column.replace(/_/g, ' ')}
    </TableHeaderColumn>;


HeaderColumn.propTypes = {
    column: PropTypes.string.isRequired,
};

export default HeaderColumn;

/**
 * Created by guillaume on 10/12/16.
 */

import React, {PropTypes} from 'react';
import {
    TableRow,
} from 'material-ui/Table';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import Column from './column';

const HOC = (Component = Column) => {
    const Row = ({columns}) =>
        <TableRow>
            {columns.map(column =>
                <Component key={column} column={column} />,
            )}
        </TableRow>;

    Row.propTypes = {
        columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    };

    return onlyUpdateForKeys(['columns'])(Row);
};

export default HOC;

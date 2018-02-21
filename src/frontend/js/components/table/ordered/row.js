/**
 * Created by guillaume on 10/12/16.
 */

import React, {PropTypes} from 'react';
import {
    TableRow,
} from 'material-ui/Table';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import orderedHeaderColumn from './column';

const HOC = (Component = orderedHeaderColumn) => {
    const Row = ({columns, setOrdering}) =>
        <TableRow>
            {columns.map(column =>
                <Component key={column} column={column} setOrdering={setOrdering} />,
            )}
        </TableRow>;

    Row.propTypes = {
        columns: PropTypes.arrayOf(PropTypes.string).isRequired,
        setOrdering: PropTypes.func.isRequired,
    };

    return onlyUpdateForKeys(['columns', 'setOrdering'])(Row);
};

export default HOC;

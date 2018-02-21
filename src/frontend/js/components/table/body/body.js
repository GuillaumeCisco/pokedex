/**
 * Created by guillaume on 10/12/16.
 */

import React, {PropTypes} from 'react';
import {
    TableBody,
} from 'material-ui/Table';

import RowHOC from './row';

const Row = RowHOC(); // nested component default to RowColumn

const HOC = (Component = Row) => {
    const Body = ({id, results, columns, setItem}) =>
        <TableBody displayRowCheckbox={false}>
            {results.map(item =>
                <Component key={`row_${item.name}`} id={id} item={item} columns={columns} setItem={setItem} />,
            )}
        </TableBody>;

    Body.muiName = TableBody.muiName;

    Body.propTypes = {
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        results: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.shape({}),
        ])).isRequired,
        columns: PropTypes.arrayOf(PropTypes.string).isRequired,
        setItem: PropTypes.func.isRequired,
    };

    Body.defaultProps = {
        id: null,
    };

    return Body;
};

export default HOC;

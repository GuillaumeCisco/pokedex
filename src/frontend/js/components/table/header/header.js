/**
 * Created by guillaume on 10/12/16.
 */

import React from 'react';
import {
    TableHeader,
} from 'material-ui/Table';

import RowHOC from './row';

const Row = RowHOC();

const HOC = (Component = Row) => {
    const Header = props =>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <Component {...props} />
        </TableHeader>;

    Header.muiName = TableHeader.muiName; // override

    return Header;
};

export default HOC;

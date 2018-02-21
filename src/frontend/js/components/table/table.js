/**
 * Created by guillaume on 10/12/16.
 */

import React, {PropTypes} from 'react';
import {
    Table as MaterialTable,
} from 'material-ui/Table';

import {table} from './style';

import TableHeaderHOC from './header/header';
import TableBodyHOC from './body/body';

const TableHeader = TableHeaderHOC();
const TableBody = TableBodyHOC();   // nested component default to Row

const HOC = (Header = TableHeader, Body = TableBody) => {
    const Table = ({results, columns, id, setItem}) =>
        <MaterialTable style={table} selectable={false}>
            <Header columns={columns} />
            <Body results={results} id={id} columns={columns} setItem={setItem} />
        </MaterialTable>;

    Table.propTypes = {
        id: PropTypes.number,
        setItem: PropTypes.func.isRequired,
        results: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.shape({}),
        ])).isRequired,
        columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    };

    Table.defaultProps = {
        id: null,
    };

    return Table;
};

export default HOC;

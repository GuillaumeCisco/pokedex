/**
 * Created by guillaume on 10/12/16.
 */

import React, {PropTypes} from 'react';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import {
    Table as MaterialTable,
} from 'material-ui/Table';

import {table} from '../style';

import OrderedHeaderHOC from './header';
import TableBodyHOC from '../body/body';

const TableHeader = OrderedHeaderHOC();
const TableBody = TableBodyHOC();   // nested component default to Row

const HOC = (Header = TableHeader, Body = TableBody) => {
    const Table = ({results, columns, id, count, page, query, order, setItem, setOrder, loadListAndReset}) =>
        <MaterialTable style={table} selectable={false}>
            <Header
                columns={columns}
                order={order}
                setOrder={setOrder}
                results={results}
                count={count}
                page={page}
                query={query}
                loadListAndReset={loadListAndReset}
            />
            <Body
                results={results}
                id={id}
                columns={columns}
                setItem={setItem}
            />
        </MaterialTable>;

    Table.propTypes = {
        id: PropTypes.number,
        setItem: PropTypes.func.isRequired,
        order: PropTypes.string,
        setOrder: PropTypes.func.isRequired,
        results: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.shape({}),
        ])).isRequired,
        query: PropTypes.shape({}),
        page: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        columns: PropTypes.arrayOf(PropTypes.string).isRequired,
        loadListAndReset: PropTypes.func.isRequired,
    };

    Table.defaultProps = {
        id: null,
        order: null,
        query: null,
    };

    return onlyUpdateForKeys(['results', 'columns', 'id', 'count', 'page', 'query', 'order', 'setItem', 'setOrder', 'loadListAndReset'])(Table);
};

export default HOC;

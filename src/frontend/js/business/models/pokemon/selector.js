/**
 * Created by guillaume on 6/27/16.
 */

import {createSelector} from 'reselect';
import {orderBy} from 'lodash';
import {isValid, parse} from 'date-fns';
import queryString from 'query-string';
import createDeepEqualSelector from '../../../utils/selector';

const item = state => state.item;
const results = state => state.list.results;
const error = state => state.list.error;
const itemError = state => state.item.error;
const order = state => state.ordering.order;
const location = props => props.location;

const getColumns = createSelector([results],
    results => results && results.length ? Object.keys(results[0]) : [],
);

export const getFilteredColumns = createDeepEqualSelector([getColumns],
    columns => columns.filter(item => !['id'].includes(item)),
);

export const formattedResults = createDeepEqualSelector([results],
    results => results.map(o => ({
        ...o,
        id: +o.url.split('/').slice(-2)[0],
    })),
);

// Ordered filtered formatted results
export const getOrderedResults = createDeepEqualSelector([formattedResults, order],
    (results, order) => order ? (() => {
        const ord = order.startsWith('-') ? order.slice(1, order.length) : order;
        return orderBy(
            results,
            (o) => {
                if (['date'].includes(ord)) {
                    return o[ord] && isValid(parse(o[ord])) ? parse(o[ord]) : new Date('01/01/1970');
                }

                return o[ord];
            }, order.startsWith('-') ? 'desc' : 'asc',
        );
    })() : results,
);

export const getItem = createSelector([item, formattedResults],
    (item, results) => item.results && item.results[item.id] ? item.results[item.id] : (item.id ? results.find(o => +o.url.split('/').slice(-2)[0] === item.id) : null),
);

export const getError = createSelector([error],
    error => error ? JSON.parse(error.message) : error,
);

export const getItemError = createSelector([itemError],
    error => error ? (JSON.parse(error.message).message ? JSON.parse(error.message).message : JSON.parse(error.message).detail) : error,
);

export const getQuery = createSelector([location],
    location => location && location.search ? queryString.parse(location.search) : null,
);

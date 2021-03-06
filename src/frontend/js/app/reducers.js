/* globals window */

import {reducer as formReducer} from 'redux-form';

import {routerReducer} from 'react-router-redux';
import top from '../business/top/reducer';
import {actionTypes} from './actions';

const initialState = {error: ''};

const general = (state = initialState, {type, payload}) => {
    switch (type) {
    case actionTypes.error.SET:
        return {
            ...state,
            error: payload,
        };
    default:
        return state;
    }
};

export default {
    form: formReducer,
    routing: routerReducer,
    top,
    general,
};

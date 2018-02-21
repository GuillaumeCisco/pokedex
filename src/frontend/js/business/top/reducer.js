/* globals APP_NAME*/

import {actionTypes} from './actions';

const initialState = {
    open: false,
    title: APP_NAME,
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionTypes.top.TOGGLE:
        return {
            ...state,
            open: !state.open,
        };
    case actionTypes.top.SET:
        return {
            ...state,
            open: payload,
        };
    case actionTypes.title.SET:
        return {
            ...state,
            title: payload,
        };
    default:
        return state;
    }
};

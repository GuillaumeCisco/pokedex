import {createAction} from 'redux-actions';
import createRequestActionTypes from '../../actions/createRequestActionTypes';


export const actionTypes = {
    top: createRequestActionTypes('TOP', ['TOGGLE', 'SET']),
    title: createRequestActionTypes('TITLE', ['SET']),
};

export default {
    top: {
        toggle: createAction(actionTypes.top.TOGGLE),
        set: createAction(actionTypes.top.SET),
    },
    title: {
        set: createAction(actionTypes.title.SET),
    },
};

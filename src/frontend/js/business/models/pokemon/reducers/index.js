import {actionTypes} from '../actions';
import {
    pagination,
    list,
    item,
    modal,
    persistent,
    ordering,
} from '../../../../reducers';

export default {
    list: list(actionTypes),
    item: item(actionTypes),
    modal: modal(actionTypes),
    pagination: pagination(actionTypes),
    persistent: persistent(actionTypes),
    ordering: ordering(actionTypes),
};

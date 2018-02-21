import {actions as listActions, actionTypes as listActionTypes} from '../../../actions/list';
import {actions as persistentActions, actionTypes as persistentActionTypes} from '../../../actions/persistent';
import {actions as itemActions, actionTypes as itemActionTypes} from '../../../actions/item';
import {actions as modalActions, actionTypes as modalActionTypes} from '../../../actions/modal';
import {actions as paginationActions, actionTypes as paginationActionTypes} from '../../../actions/pagination';
import {actions as orderingActions, actionTypes as orderingActionTypes} from '../../../actions/ordering';

const prefix = 'MODELS::POKEMON';

export const actionTypes = {
    list: listActionTypes(prefix),
    persistent: persistentActionTypes(prefix),
    item: itemActionTypes(prefix),
    modal: modalActionTypes(prefix),
    pagination: paginationActionTypes(prefix),
    ordering: orderingActionTypes(prefix),
};

const actions = {
    list: listActions(actionTypes.list),
    persistent: persistentActions(actionTypes.persistent),
    item: itemActions(actionTypes.item),
    modal: modalActions(actionTypes.modal),
    pagination: paginationActions(actionTypes.pagination),
    ordering: orderingActions(actionTypes.ordering),
};

export default actions;

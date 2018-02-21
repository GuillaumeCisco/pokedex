/**
 * Created by guillaume on 2/17/17.
 */

export ActionsHOC from './actions';
export BasicFormHOC from './basicForm';
export CreateDialogHOC from './createDialog';
export CreateItemHOC from './createItem';
export CreateLayoutHOC from './createLayout';
export UpdateItemHOC from './updateItem';

export default {
    ActionsHOC: System.import('./actions').then(module => module.default),
    BasicFormHOC: System.import('./basicForm').then(module => module.default),
    CreateDialogHOC: System.import('./createDialog').then(module => module.default),
    CreateItemHOC: System.import('./createItem').then(module => module.default),
    CreateLayoutHOC: System.import('./createLayout').then(module => module.default),
    UpdateItemHOC: System.import('./updateItem').then(module => module.default),
};

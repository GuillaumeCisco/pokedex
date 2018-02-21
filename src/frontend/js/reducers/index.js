export pagination from './pagination';
export list from './list';
export item from './item';
export modal from './modal';
export persistent from './persistent';
export ordering from './ordering';

export default {
    list: System.import('./list').then(module => module.default),
    item: System.import('./item').then(module => module.default),
    modal: System.import('./modal').then(module => module.default),
    pagination: System.import('./pagination').then(module => module.default),
    persistent: System.import('./persistent').then(module => module.default),
    ordering: System.import('./ordering').then(module => module.default),
};

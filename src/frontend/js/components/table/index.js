/**
 * Created by guillaume on 2/16/17.
 */

export TableHOC from './table';

export HeaderHOC from './header/header';
export HeaderRowHOC from './header/row';
export HeaderColumnHOC from './header/column';

export BodyHOC from './body/body';
export BodyRowHOC from './body/row';
export BodyRowColumn from './body/column';

export PaginatedTableHOC from './paginated';

export OrderedTableHOC from './ordered/table';
export OrderedHeaderHOC from './ordered/header';
export OrderedHeaderRowHOC from './ordered/row';
export OrderedHeaderColumnHOC from './ordered/column';

export default {
    TableHOC: System.import('./table').then(module => module.default),

    BodyHOC: System.import('./body/body').then(module => module.default),
    BodyRowHOC: System.import('./body/row').then(module => module.default),
    BodyRowColumn: System.import('./body/column').then(module => module.default),

    HeaderHOC: System.import('./header/header').then(module => module.default),
    HeaderRowHOC: System.import('./header/row').then(module => module.default),
    HeaderColumnHOC: System.import('./header/column').then(module => module.default),

    PaginatedTableHOC: System.import('./paginated').then(module => module.default),

    OrderedTableHOC: System.import('./ordered/table').then(module => module.default),
    OrderedHeaderHOC: System.import('./ordered/header').then(module => module.default),
    OrderedHeaderRowHOC: System.import('./ordered/row').then(module => module.default),
    OrderedHeaderColumnHOC: System.import('./ordered/column').then(module => module.default),
};

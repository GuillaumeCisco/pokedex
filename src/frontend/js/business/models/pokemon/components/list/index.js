import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import actions from '../../actions';
import {getError, getOrderedResults, getFilteredColumns, getQuery} from '../../selector';

import {
    OrderedTableHOC,
    OrderedHeaderHOC,
    BodyHOC,
    BodyRowHOC,
    PaginatedTableHOC,
} from '../../../../../components/table';

// import our overrided version of rowColum for managing date
import RowColumn from './rowColumn';
// you can override TableHeader, TableBody and even nested components as you want
const OrderedTable = OrderedTableHOC(OrderedHeaderHOC(), BodyHOC(BodyRowHOC(RowColumn)));

// add Pagination
const PaginatedOrderedTable = PaginatedTableHOC(OrderedTable);

// Classic way
// import {TableHOC} from '../../../../../components/table';
// const Table = TableHOC();

class List extends React.PureComponent {
    componentWillMount() {
        // load list and item (handle pagination too)
        if (!this.props.loading && !this.props.init) {
            this.props.loadListAndItem(this.props.id);
        }
        else if (this.props.id) {
            this.props.setItem(this.props.id);
        }
    }

    render() {
        return (<div className="list">
            <PaginatedOrderedTable {...this.props} />
        </div>);
    }
}

// type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
// decl := ReactPropTypes.{type}(.isRequired)?
List.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    loading: PropTypes.bool.isRequired,
    init: PropTypes.bool.isRequired,
    loadListAndItem: PropTypes.func.isRequired,
    setItem: PropTypes.func.isRequired,
};

List.defaultProps = {
    id: null,
    loading: false,
    init: false,
};

function mapStateToProps(s, ownProps) {
    const state = s.models.pokemon;

    return {
        id: +ownProps.match.params.id || state.item.id,

        loading: state.list.loading,
        init: state.list.init,

        count: state.list.count,
        next: state.list.next,
        previous: state.list.previous,

        order: state.ordering.order,

        query: getQuery(ownProps),
        error: getError(state),
        results: getOrderedResults(state),
        columns: getFilteredColumns(state),

        page: state.pagination.page,
        pages: state.pagination.pages,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onPage: actions.pagination.set.request,

        loadListAndItem: actions.list.request_item,
        loadListAndReset: actions.list.reset,
        setItem: actions.item.set,
        setOrder: actions.ordering.set,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(List);

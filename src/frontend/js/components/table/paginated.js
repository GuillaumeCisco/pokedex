/**
 * Created by guillaume on 10/12/16.
 */

import React, {PropTypes} from 'react';

import Pagination from '../pagination/pagination';
import LoaderBig from '../../presentation/loaders/big';

/** *
 *
 * You can import this HOC from your parent file and override all the way table works
 *
/***/


// Classic way
import TableHOC from './table';

const Table = TableHOC();


const HOC = (Component = Table) => {
    // need to disable linter for using context
    class PaginatedTable extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
        render() {
            const {
                loading, count, next, previous, pages, error,
                onPage,
            } = this.props;


            return (<div>
                {loading && <LoaderBig />}
                {!loading && count !== 0 && [
                    <Pagination
                        key="front_pagination"
                        count={count}
                        next={next}
                        previous={previous}
                        pages={pages}
                        onPage={onPage}
                        context={this.context}
                    />,
                    <Component
                        key="table"
                        {...this.props}
                    />,
                    <Pagination
                        key="back_pagination"
                        count={count}
                        next={next}
                        previous={previous}
                        pages={pages}
                        onPage={onPage}
                        context={this.context}
                    />,
                ]}
                {error && <p className="error">{error.detail}</p>}
            </div>);
        }
    }

    PaginatedTable.propTypes = {
        loading: PropTypes.bool,
        count: PropTypes.number,
        next: PropTypes.string,
        previous: PropTypes.string,
        pages: PropTypes.arrayOf(PropTypes.shape({})),
        error: PropTypes.shape({}),

        onPage: PropTypes.func,
    };

    PaginatedTable.contextTypes = {
        muiTheme: PropTypes.shape({}).isRequired,
    };

    PaginatedTable.defaultProps = {
        error: null,
        query: null,
        previous: null,
        next: null,
        loading: false,
        init: false,
        count: 0,
        order: null,
        pages: [],
        onPage: null,
    };

    return PaginatedTable;
};

export default HOC;

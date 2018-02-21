/**
 * Created by guillaume on 10/12/16.
 */

import React, {PropTypes} from 'react';
import {
    TableHeader,
} from 'material-ui/Table';

import OrderedRowHOC from './row';

const OrderedRow = OrderedRowHOC();

const HOC = (Component = OrderedRow) => {
    class OrderedHeader extends React.PureComponent {
        constructor(props) {
            super(props);
            this.setOrdering = this.setOrdering.bind(this);
        }

        componentWillMount() {
            // set order query in store
            if (this.props.query && typeof this.props.query.ordering !== 'undefined') {
                this.props.setOrder({order: this.props.query.ordering});
            }
        }

        setOrdering(column) {
            let columnToOrderBy = column;

            if (this.props.order && !this.props.order.startsWith('-')) {
                columnToOrderBy = this.props.order === columnToOrderBy ? `-${columnToOrderBy}` : columnToOrderBy;
            }
            else if (!this.props.order) {
                columnToOrderBy = `-${columnToOrderBy}`;
            }

            this.props.setOrder({order: columnToOrderBy});
            // reload if necessary (pagination)
            if (columnToOrderBy && (this.props.results.length < this.props.count || this.props.page > 1)) {
                this.props.loadListAndReset();
            }
        }

        render() {
            const {columns} = this.props;

            return (<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <Component setOrdering={this.setOrdering} columns={columns} />
            </TableHeader>);
        }
    }

    OrderedHeader.muiName = TableHeader.muiName; // override

    OrderedHeader.propTypes = {
        setOrder: PropTypes.func.isRequired,
        columns: PropTypes.arrayOf(PropTypes.string).isRequired,
        results: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.shape({}),
        ])).isRequired,
        order: PropTypes.string,
        page: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        query: PropTypes.shape({
            ordering: PropTypes.string,
        }),
        loadListAndReset: PropTypes.func.isRequired,
    };

    OrderedHeader.defaultProps = {
        order: null,
        query: null,
    };

    return OrderedHeader;
};

export default HOC;

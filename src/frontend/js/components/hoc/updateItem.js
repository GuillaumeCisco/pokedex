import React, {PropTypes} from 'react';
import {isEmpty} from 'lodash';

const HOC = (Component) => {
    class UpdateItem extends React.Component {
        constructor(props) {
            super(props);
            this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
            this.onDeleteCancel = this.onDeleteCancel.bind(this);
            this.onUpdateConfirm = this.onUpdateConfirm.bind(this);
            this.onUpdateCancel = this.onUpdateCancel.bind(this);
        }
        onDeleteConfirm() {
            this.props.deleteItem(this.props.id);
        }
        onDeleteCancel() {
            this.props.toggleDeleteModal(false);
        }
        onUpdateConfirm(values) {
            // strip non modified values
            const updatedValues = Object.keys(values).reduce((previous, current) => (
                {
                    ...previous,
                    ...(values[current] !== this.props.item[current] ? {[current]: values[current]} : {}),
                }
            ), {});

            // Do not send if empty value
            if (!isEmpty(updatedValues)) {
                this.props.updateItem({values: updatedValues, id: this.props.id});
            }
        }
        onUpdateCancel() {
            this.props.toggleUpdateModal(false);
        }
        render() {
            const newProps = {
                onDeleteConfirm: this.onDeleteConfirm,
                onDeleteCancel: this.onDeleteCancel,
                onUpdateConfirm: this.onUpdateConfirm,
                onUpdateCancel: this.onUpdateCancel,
                initialValues: this.initialValues,
            };

            return (
                <Component {...this.props} {...newProps} />
            );
        }
    }

    UpdateItem.propTypes = {
        deleteItem: PropTypes.func.isRequired,
        toggleDeleteModal: PropTypes.func.isRequired,
        toggleUpdateModal: PropTypes.func.isRequired,
        id: PropTypes.number,
        updateItem: PropTypes.func.isRequired,
        item: PropTypes.shape({}),
    };

    UpdateItem.defaultProps = {
        id: null,
        item: null,
    };

    return UpdateItem;
};

export default HOC;

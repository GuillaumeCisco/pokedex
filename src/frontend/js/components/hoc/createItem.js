import React, {PropTypes} from 'react';
import {isEmpty} from 'lodash';

// Enhanced HOC

const HOC = (Component) => {
    class createItem extends React.Component {
        constructor(props) {
            super(props);
            this.onCreateConfirm = this.onCreateConfirm.bind(this);
            this.onCreateCancel = this.onCreateCancel.bind(this);
        }

        onCreateConfirm(values) {
            let updatedValues = values;

            if (!isEmpty(updatedValues)) {
                // pass empty string to undefined for avoiding side effects
                updatedValues = Object.keys(updatedValues).reduce((previous, current) => (
                    {...previous, [current]: updatedValues[current] === '' ? undefined : updatedValues[current]}
                ), {});

                this.props.createItem(updatedValues);
            }
        }

        onCreateCancel() {
            this.props.toggleCreateModal(false);
        }

        render() {
            const newProps = {
                onCreateConfirm: this.onCreateConfirm,
                onCreateCancel: this.onCreateCancel,
            };

            return (
                <Component {...this.props} {...newProps} />
            );
        }
    }

    createItem.propTypes = {
        createItem: PropTypes.func.isRequired,
        toggleCreateModal: PropTypes.func.isRequired,
    };

    return createItem;
};

export default HOC;

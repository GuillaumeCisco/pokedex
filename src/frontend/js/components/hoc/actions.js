import React, {PropTypes} from 'react';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import {CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';

import DeleteModal from '../../presentation/modals/delete';


const HOC = (UpdateModal) => {
    class Actions extends React.Component {
        constructor(props) {
            super(props);
            this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
            this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
        }
        toggleDeleteModal() {
            this.props.toggleDeleteModal(true);
        }
        toggleUpdateModal() {
            this.props.toggleUpdateModal(true);
        }
        render(props) {
            const {
                modal, error,
                onDeleteCancel, onDeleteConfirm, onUpdateCancel, onUpdateConfirm,
            } = this.props;

            return (
                <CardActions>
                    <RaisedButton
                        label="Delete"
                        secondary
                        onTouchTap={this.toggleDeleteModal}
                        icon={<ContentClear />}
                    />
                    <RaisedButton
                        label="Update"
                        primary
                        onTouchTap={this.toggleUpdateModal}
                        icon={<ContentCreate />}
                    />
                    <DeleteModal
                        isVisible={modal.delete} onCancel={onDeleteCancel}
                        onConfirm={onDeleteConfirm} error={error}
                    />
                    <UpdateModal
                        isVisible={modal.update} onCancel={onUpdateCancel}
                        onConfirm={onUpdateConfirm}
                    />
                </CardActions>
            );
        }
    }

    Actions.propTypes = {
        modal: PropTypes.shape({}).isRequired,
        error: PropTypes.oneOfType([
            PropTypes.shape({}),
            PropTypes.string,
        ]),
        toggleDeleteModal: PropTypes.func.isRequired,
        toggleUpdateModal: PropTypes.func.isRequired,
        onDeleteCancel: PropTypes.func.isRequired,
        onUpdateCancel: PropTypes.func.isRequired,
        onUpdateConfirm: PropTypes.func.isRequired,
        onDeleteConfirm: PropTypes.func.isRequired,
    };

    Actions.defaultProps = {
        error: null,
    };

    const keys = ['modal', 'error'];

    return onlyUpdateForKeys(keys)(Actions);
};

export default HOC;


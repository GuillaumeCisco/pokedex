import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const DeleteModal = ({isVisible, error, title = 'Delete Item', onCancel, onConfirm}) => {
    const actions = [
        <FlatButton
            label="No"
            primary
            onTouchTap={onCancel}
        />,
        <FlatButton
            label="Yes"
            primary
            onTouchTap={onConfirm}
        />,
    ];

    return (
        <div>
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={isVisible}
                onRequestClose={onCancel}
            >
                <p>Are you sure you want to delete this item?</p>
                {error && <span className="error">{error}</span>}
            </Dialog>
        </div>
    );
};

DeleteModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.string,
    ]),
    title: PropTypes.string,
};

DeleteModal.defaultProps = {
    error: null,
    title: null,
};

export default onlyUpdateForKeys(['isVisible', 'error', 'title', 'onCancel', 'onConfirm'])(DeleteModal);

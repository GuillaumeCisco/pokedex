import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const style = {overflowY: 'auto'};

const HOC = (Component, title = 'Create Item') => {
    const CreateDialog = (props) => {
        const {isVisible, onCancel} = props;

        return (
            <Dialog
                title={title}
                modal={false}
                open={isVisible}
                onRequestClose={onCancel}
                bodyStyle={style}
            >
                <Component {...props} />
            </Dialog>
        );
    };

    CreateDialog.propTypes = {
        isVisible: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired,
    };

    return onlyUpdateForKeys(['isVisible', 'onCancel'])(CreateDialog);
};

export default HOC;

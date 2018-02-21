import React, {PropTypes} from 'react';
import classNames from 'classnames';
import FlatButton from 'material-ui/FlatButton';
import {propTypes} from 'redux-form';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const HOC = (Component, submit = 'Submit') => {
    const BasicForm = (props) => {
        const {onCancel, onConfirm, handleSubmit, submitting, pristine, submitFailed, formError} = props;

        return (
            <div>
                <Component {...props} />
                <FlatButton
                    label="Cancel"
                    secondary
                    disabled={submitting}
                    onTouchTap={onCancel}
                />
                <FlatButton
                    label={submit}
                    type="submit"
                    primary
                    disabled={pristine || submitting}
                    onTouchTap={handleSubmit(onConfirm)}
                    className={classNames({
                        error: formError || submitFailed,
                    })}
                />
            </div>
        );
    };

    BasicForm.propTypes = {
        ...propTypes,
        formError: PropTypes.shape({}),
    };

    BasicForm.defaultProps = {
        formError: null,
    };

    return onlyUpdateForKeys(['submitting', 'pristine', 'submitFailed', 'formError'])(BasicForm);
};

export default HOC;


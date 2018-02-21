/**
 * Created by guillaume on 8/4/16.
 */
import React, {PropTypes} from 'react';
import {Field} from 'redux-form';

import TextInput from '../../../../components/inputs/TextInput';

const style = {
    margin: '0 auto',
    width: '256px',
};

const Form = ({onConfirm, handleSubmit, formError}) =>
    <form onSubmit={handleSubmit(onConfirm)}>
        <div style={style}>
            <Field name="name" component={TextInput} type="text" floatingLabelText="Name" />
            {formError && formError.name && formError.name.map((error, i) => (
                <span key={`error_name_${error}`} className="error">{error}</span>))
            }
        </div>
    </form>;

Form.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    formError: PropTypes.shape({}),
};

Form.defaultProps = {
    formError: null,
};

export default Form;

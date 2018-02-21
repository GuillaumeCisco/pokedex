/**
 * Created by guillaume on 7/25/16.
 */
import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const defaultStyle = {
    inputStyle: {
        WebkitBoxShadow: '0 0 0 1000px white inset',
    },
    hintStyle: {
        zIndex: '1',
    },
};

const TextAreaInput = ({input, placeholder, floatingLabelText, type, meta: {touched, error}, style}) =>
    <TextField
        inputStyle={defaultStyle.inputStyle}
        type={type}
        hintStyle={defaultStyle.hintStyle}
        errorText={touched && error}
        placeholder={placeholder}
        multiLine
        floatingLabelText={floatingLabelText}
        style={style}
        {...input}
    />;

TextAreaInput.propTypes = {
    input: PropTypes.shape({}).isRequired,
    placeholder: PropTypes.string.isRequired,
    floatingLabelText: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    meta: PropTypes.shape({
        touched: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
    }).isRequired,
    style: PropTypes.shape({}).isRequired,
};

const keys = ['input', 'placeholder', 'floatingLabelText', 'type', 'meta', 'style'];

export default onlyUpdateForKeys(keys)(TextAreaInput);

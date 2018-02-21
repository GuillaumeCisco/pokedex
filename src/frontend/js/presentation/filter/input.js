import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const defaultStyle = {
    display: 'block',
};

const InputFilter = ({value, style, floatingLabelText, onChange, onKeyDown, onBlur}) =>
    <TextField
        name="input"
        value={value}
        onBlur={onBlur}
        floatingLabelText={floatingLabelText}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={{...defaultStyle, ...style}}
    />;

InputFilter.propTypes = {
    onBlur: PropTypes.func.isRequired,
    floatingLabelText: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
};

InputFilter.defaultProps = {
    floatingLabelText: '',
    value: '',
    style: null,
};

export default onlyUpdateForKeys(['value', 'style', 'floatingLabelText'])(InputFilter);

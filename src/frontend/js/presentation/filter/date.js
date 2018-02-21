import React, {PropTypes} from 'react';
import DatePicker from 'material-ui/DatePicker';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const defaultStyle = {
    main: {
        width: 100,
        display: 'inline-block',
    },
    textField: {
        width: 100,
    },
};

const Date = ({value, label, style, onChange}) =>
    <DatePicker
        autoOk
        container="inline"
        hintText={label}
        name={label}
        floatingLabelText={label}
        onChange={onChange}
        value={value || null}
        style={{...defaultStyle.main, ...style}}
        textFieldStyle={defaultStyle.textField}
    />;

Date.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({}),
    ]),
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
};

Date.defaultProps = {
    value: null,
    label: '',
    style: null,
};

export default onlyUpdateForKeys(['value', 'label', 'style'])(Date);

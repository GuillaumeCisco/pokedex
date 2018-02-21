import React, {PropTypes} from 'react';
import TimePicker from 'material-ui/TimePicker';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import format from '../../utils/formatTime';

const style = {
    main: {
        width: 50,
        display: 'inline-block',
    },
    text: {
        width: 50,
    },
};

const Time = ({value, label, onChange}) =>
    <TimePicker
        autoOk
        format="24hr"
        name={label}
        hintText={label}
        floatingLabelText={label}
        onChange={onChange}
        value={format(value)}
        style={style.main}
        textFieldStyle={style.text}
    />;

Time.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({}),
    ]),
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

Time.defaultProps = {
    value: null,
    label: '',
};

export default onlyUpdateForKeys(['value', 'label'])(Time);

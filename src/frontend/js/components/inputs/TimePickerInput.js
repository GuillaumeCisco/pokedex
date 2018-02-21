import React, {PropTypes} from 'react';
import TimePicker from 'material-ui/TimePicker';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import format from '../../utils/formatTime';

class TimePickerInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(evt, date) {
        if (this.props.input.onChange) {
            this.props.input.onChange(date);
        }
    }

    render() {
        const {hintText, input} = this.props;

        return (<TimePicker
            format="24hr"
            hintText={hintText}
            {...input}
            onChange={this.onChange}
            value={format(input.value)}
        />);
    }
}

TimePickerInput.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.shape({}).isRequired,
            PropTypes.string.isRequired,
        ]),
    }).isRequired,
    hintText: PropTypes.string.isRequired,
};

export default onlyUpdateForKeys(['input', 'hintText'])(TimePickerInput);


import React, {PropTypes} from 'react';
import DatePicker from 'material-ui/DatePicker';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

class DatePickerInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(evt, date) {
        if (this.props.input.onChange) {
            this.props.input.onChange(date || null);
        }
    }

    render() {
        const {hintText, floatingLabelText, input} = this.props;

        return (<DatePicker
            autoOk
            container="inline"
            hintText={hintText}
            floatingLabelText={floatingLabelText}
            {...input}
            onChange={this.onChange}
            value={input.value ? new Date(input.value) : null} // rerender
        />);
    }
}

DatePickerInput.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    hintText: PropTypes.string.isRequired,
    floatingLabelText: PropTypes.string.isRequired,
};


export default onlyUpdateForKeys(['hintText', 'floatingLabelText', 'input'])(DatePickerInput);


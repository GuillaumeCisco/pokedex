import React, {PropTypes} from 'react';
import {setHours, setMinutes, getMinutes, getHours} from 'date-fns';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import Date from '../../presentation/filter/date';
import Time from '../../presentation/filter/time';

const containerStyle = {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'middle',
};

class DateTimePickerInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);

        this.style = {
            date: {
                width: 110,
            },
        };
    }

    onChange(evt, date) {
        if (this.props.input.onChange) {
            this.props.input.onChange(date || null);
        }
    }

    onDateChange(evt, value) {
        const {input} = this.props;

        // we need to keep the time
        const v = setHours(setMinutes(value, getMinutes(input.value) || 0), getHours(input.value) || 0);
        this.onChange(evt, v);
    }

    render() {
        const {label, input, meta: {touched, error}} = this.props;

        return (<div style={containerStyle}>
            <Date {...this.props} label={label.date} onChange={this.onDateChange} value={input.value || null} style={this.style.date} />
            <Time {...this.props} label={label.time} onChange={this.onChange} value={input.value || null} />
            {touched && <span className="error">{error}</span> }
        </div>);
    }
}

DateTimePickerInput.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
    }).isRequired,
    label: PropTypes.shape({
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    meta: PropTypes.shape({}).isRequired,
};


export default onlyUpdateForKeys(['label', 'input', 'meta'])(DateTimePickerInput);

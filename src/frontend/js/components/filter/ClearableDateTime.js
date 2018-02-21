import React, {PropTypes} from 'react';
import {setHours, setMinutes, getMinutes, getHours} from 'date-fns';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import Clearable from './ClearableHOC';
import Date from '../../presentation/filter/date';
import Time from '../../presentation/filter/time';

const containerStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
};

class ClearableDateTime extends React.Component {
    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }
    onDateChange(evt, value) {
        // we need to keep the time
        const v = setHours(setMinutes(value, getMinutes(this.props.value) || 0), getHours(this.props.value) || 0);
        return this.props.onChange(evt, v);
    }
    clear() {
        this.props.onChange(null, null);
    }
    render() {
        return (<div style={{...containerStyle, ...this.props.style}}>
            <Date {...this.props} onChange={this.onDateChange} />
            <Time {...this.props} style={{}} />
        </div>);
    }
}

ClearableDateTime.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.shape({}),
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
};

ClearableDateTime.defaultProps = {
    style: null,
};

export default onlyUpdateForKeys(['value', 'label', 'style', 'onChange'])(Clearable(ClearableDateTime, {clear: {verticalAlign: -20}}));

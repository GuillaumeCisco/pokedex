import React, {PropTypes} from 'react';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import Clearable from './ClearableHOC';
import Date from '../../presentation/filter/date';

class ClearableDatePickerFilter extends React.Component {
    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
    }
    clear() {
        this.props.onChange(null, null);
    }
    render() {
        return <Date {...this.props} />;
    }
}

ClearableDatePickerFilter.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default onlyUpdateForKeys(['value', 'label', 'style', 'onChange'])(Clearable(ClearableDatePickerFilter, {main: {width: 130}}));

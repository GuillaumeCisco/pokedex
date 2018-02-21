import React, {PropTypes} from 'react';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import Clearable from './ClearableHOC';
import Time from '../../presentation/filter/time';

class ClearableTimePickerFilter extends React.Component {
    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
    }
    clear() {
        this.props.onChange(null, null);
    }
    render() {
        return <Time {...this.props} />;
    }
}

ClearableTimePickerFilter.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default onlyUpdateForKeys(['value', 'label', 'onChange'])(Clearable(ClearableTimePickerFilter));

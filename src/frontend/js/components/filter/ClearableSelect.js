import React, {PropTypes} from 'react';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import Clearable from './ClearableHOC';
import Select from '../../presentation/filter/select';

class ClearableSelectFilter extends React.Component {
    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
    }
    clear() {
        this.props.onChange(null, null);
    }
    render() {
        return <Select {...this.props} />;
    }
}

ClearableSelectFilter.propTypes = {
    onChange: PropTypes.func.isRequired,
};

const style = {
    main: {
        width: 284,
    },
    clear: {
        verticalAlign: 10,
    },
};

export default onlyUpdateForKeys(['model', 'onChange', 'label', 'style'])(Clearable(ClearableSelectFilter, style));

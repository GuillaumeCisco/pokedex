/**
 * Created by guillaume on 7/25/16.
 */

import React, {Component, PropTypes} from 'react';
import Checkbox from 'material-ui/Checkbox';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

class CheckboxInput extends Component {

    constructor(props) {
        super(props);
        this.onCheck = this.onCheck.bind(this);
    }

    onCheck(e, checked) {
        this.props.input.onChange(checked);
    }

    render() {
        const {input, label, style} = this.props;

        return (<Checkbox
            {...input}
            label={label}
            checked={input.checked}
            onCheck={this.onCheck}
            style={style}
        />);
    }
}

CheckboxInput.propTypes = {
    input: PropTypes.shape({
        checked: PropTypes.bool,
        onChange: PropTypes.func,
    }).isRequired,
    label: PropTypes.string.isRequired,
    style: PropTypes.shape({}).isRequired,
};

export default onlyUpdateForKeys(['input', 'label', 'style'])(CheckboxInput);

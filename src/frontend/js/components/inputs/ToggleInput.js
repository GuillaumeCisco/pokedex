/**
 * Created by guillaume on 7/25/16.
 */
import React, {PropTypes} from 'react';
import Toggle from 'material-ui/Toggle';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

class ToggleInput extends React.Component {
    constructor(props) {
        super(props);
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(e, v) {
        if (this.props.onToggle) {
            this.props.onToggle(v);
        }
        return this.props.input.onChange(v);
    }

    render() {
        const {input, label} = this.props;

        return (<Toggle
            label={label}
            toggled={input.value || false}
            {...input}
            onToggle={this.onToggle}
        />);
    }
}

ToggleInput.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func,
    }).isRequired,
    label: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default onlyUpdateForKeys(['input', 'label'])(ToggleInput);

/**
 * Created by guillaume on 7/25/16.
 */

import React, {Component, PropTypes} from 'react';
import Select from 'react-select';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

class MultiAutocompleteInput extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(value) {
        if (this.props.onChange) {
            this.props.onChange(value);
        }

        if (this.props.input.onChange) {
            this.props.input.onChange(value);
        }
    }

    onBlur() {
        this.props.input.onBlur(this.props.input.value);
    }

    render() {
        const {name, input, placeholder, options, meta: {touched, error}} = this.props;

        return (<div>
            <Select
                {...input}
                name={name}
                onBlur={this.onBlur}
                value={input.value || ''}
                onChange={this.onChange}
                options={options}
                backspaceRemoves={false}
                multi
                className="multi-autocomplete"
                placeholder={placeholder}
            />
            {touched && <span className="error">{error}</span> }
        </div>);
    }
}

MultiAutocompleteInput.propTypes = {
    name: PropTypes.string.isRequired,
    input: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.shape({})),
            PropTypes.string.isRequired,
            PropTypes.number.isRequired,
        ]),
    }).isRequired,
    placeholder: PropTypes.string.isRequired,
    meta: PropTypes.shape({
        touched: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const keys = ['name', 'input', 'placeholder', 'options', 'meta'];

export default onlyUpdateForKeys(keys)(MultiAutocompleteInput);

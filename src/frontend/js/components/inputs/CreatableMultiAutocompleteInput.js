/**
 * Created by guillaume on 7/25/16.
 */

import React, {Component, PropTypes} from 'react';
import {Creatable} from 'react-select';
import {createComponent} from 'react-fela';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import '../../utils/react-select/react-select.css';

/* Ever import rules from fela or load the scss file (you'll need a loader for scss) */
import rule from '../../utils/react-select/fela';
// import '../..utils/react-select/multi-autocomplete.scss';

class CreatableMultiAutocompleteInput extends Component {
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
            <Creatable
                {...input}
                name={name}
                onBlur={this.onBlur}
                value={input.value || ''}
                onChange={this.onChange}
                backspaceRemoves={false}
                multi
                allowCreate
                placeholder={placeholder}
                options={options || []}
            />
            {touched && <span className="error">{error}</span> }
        </div>);
    }
}

CreatableMultiAutocompleteInput.propTypes = {
    name: PropTypes.string.isRequired,
    input: PropTypes.shape({
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        value: PropTypes.shape({}),
    }).isRequired,
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.shape({}),
    ])).isRequired,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};

const keys = ['name', 'input', 'placeholder', 'options', 'meta', 'style'];

// with scss
// export default onlyUpdateForKeys(keys)(CreatableMultiAutocompleteInput);

// with fela
const StyledCreatableMultiAutocompleteInput = createComponent(rule, CreatableMultiAutocompleteInput, keys);
export default onlyUpdateForKeys(keys)(StyledCreatableMultiAutocompleteInput);


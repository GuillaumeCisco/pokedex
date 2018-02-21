/**
 * Created by guillaume on 7/25/16.
 */

import React, {Component, PropTypes} from 'react';
import Select from 'react-select';
import {createComponent} from 'react-fela';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import '../../utils/react-select/react-select.css';

/* Ever import rules from fela or load the scss file (you'll need a loader for scss) */
import rule from '../../utils/react-select/fela';
// import '../../utils/react-select/multi-autocomplete.scss';

class MultiAutoCompleteFilter extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        const {name, placeholder, model, className, onClick} = this.props;

        return (<Select
            name={name}
            onChange={this.onChange}
            onClick={onClick}
            options={model.results}
            value={model.current}
            backspaceRemoves={false}
            multi
            className={className}
            placeholder={placeholder}
        />);
    }
}

MultiAutoCompleteFilter.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    model: PropTypes.shape({}).isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

MultiAutoCompleteFilter.defaultProps = {
    model: {},
    name: '',
    placeholder: '',
    className: null,
};

const keys = ['name', 'placeholder', 'model', 'style', 'className', 'onClick', 'onChange'];

// with scss
// export default onlyUpdateForKeys(keys)(MultiAutoCompleteFilter);

// with fela
const StyledMultiAutoCompleteFilter = createComponent(rule, MultiAutoCompleteFilter, keys);
export default onlyUpdateForKeys(keys)(StyledMultiAutoCompleteFilter);

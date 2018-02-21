/**
 * Created by guillaume on 7/25/16.
 */

import React, {Component, PropTypes} from 'react';
import SelectField from 'material-ui/SelectField';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

class SelectInput extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(evt, index, value) {
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
        const {input, style, hintText, floatingLabelText, floatingLabelFixed, children, meta: {touched, error}} = this.props;

        return (<SelectField
            onBlur={this.onBlur}
            {...input}
            hintText={hintText}
            floatingLabelText={floatingLabelText}
            floatingLabelFixed={floatingLabelFixed}
            onChange={this.onChange}
            errorText={touched && error}
            style={style}
        >
            {children}
        </SelectField>);
    }
}

SelectInput.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.number.isRequired,
            PropTypes.string.isRequired,
        ]),
    }).isRequired,
    hintText: PropTypes.string.isRequired,
    floatingLabelText: PropTypes.string.isRequired,
    floatingLabelFixed: PropTypes.string.isRequired,
    meta: PropTypes.shape({
        touched: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    style: PropTypes.shape({}).isRequired,
};

const keys = ['input', 'style', 'hintText', 'floatingLabelText', 'floatingLabelFixed', 'children', 'meta'];

export default onlyUpdateForKeys(keys)(SelectInput);

/**
 * Created by guillaume on 7/25/16.
 */
import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);

        this.style = {
            inputStyle: {
                WebkitBoxShadow: '0 0 0 1000px white inset',
            },
            hintStyle: {
                zIndex: '1',
            },
        };
    }

    onChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
        return this.props.input.onChange(e.target.value);
    }

    render() {
        const {input, placeholder, floatingLabelText, type = 'text', meta: {touched, error}, style} = this.props;

        return (<TextField
            inputStyle={this.style.inputStyle}
            type={type}
            hintStyle={this.style.hintStyle}
            errorText={touched && error}
            placeholder={placeholder}
            floatingLabelText={floatingLabelText}
            {...input}
            onChange={this.onChange}
            style={style}
        />);
    }
}

TextInput.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func,
    }).isRequired,
    placeholder: PropTypes.string,
    floatingLabelText: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
    }).isRequired,
    style: PropTypes.shape({}),
};

TextInput.defaultProps = {
    floatingLabelText: '',
    placeholder: '',
    onChange: null,
    style: {},
};

export default onlyUpdateForKeys(['placeholder', 'type', 'floatingLabelText', 'style', 'meta', 'input'])(TextInput);

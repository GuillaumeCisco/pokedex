/**
 * Created by guillaume on 7/25/16.
 */
import React, {Component, PropTypes} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const defaultStyle = {
    width: '100%',
};

class AutocompleteInput extends Component {
    constructor(props) {
        super(props);
        this.onNewRequest = this.onNewRequest.bind(this);
    }

    onNewRequest(chosenRequest) {
        if (this.props.onNewRequest) {
            this.props.onNewRequest(chosenRequest[this.props.config.value]);
        }
        this.props.input.onChange(chosenRequest[this.props.config.value]);
    }

    render() {
        const {input, options, config, onUpdateInput, floatingLabelText, meta: {touched, error}, style} = this.props;

        return (<AutoComplete
            {...input}
            floatingLabelText={floatingLabelText}
            dataSource={options || []}
            dataSourceConfig={config}
            searchText={input.value || ''}
            onUpdateInput={onUpdateInput}
            onNewRequest={this.onNewRequest}
            style={{...defaultStyle, ...style}}
            fullWidth
            errorText={touched && error}
        />);
    }
}

AutocompleteInput.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func,
    }).isRequired,
    config: PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
    }).isRequired,
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({}),
    ])).isRequired,
    floatingLabelText: PropTypes.string.isRequired,
    onNewRequest: PropTypes.func.isRequired,
    onUpdateInput: PropTypes.func.isRequired,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
    }).isRequired,
    style: PropTypes.shape({}).isRequired,
};

const keys = ['input', 'options', 'config', 'onUpdateInput', 'floatingLabelText', 'meta', 'style'];

export default onlyUpdateForKeys(keys)(AutocompleteInput);

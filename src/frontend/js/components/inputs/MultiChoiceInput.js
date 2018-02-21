/**
 * Created by guillaume on 10/25/16.
 */


/**
 * Created by guillaume on 7/25/16.
 */

import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import classNames from 'classnames';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

class B extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);

        this.style = {
            margin: '0 6px 0 0',
        };
    }

    onChange() {
        if (this.props.input.onChange) {
            this.props.input.onChange(this.props.item.value);
        }
    }

    onBlur() {
        if (this.props.input.onBlur) {
            this.props.input.onBlur();
        }
    }

    render() {
        const {input, item} = this.props;

        return (<RaisedButton
            className={classNames({
                selected: +input.value === +item.value,
            })}
            key={item.label}
            label={item.label}
            onClick={this.onChange}
            onBlur={this.onBlur}
            style={this.style}
        />);
    }
}

B.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
    }).isRequired,
    item: PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
    }).isRequired,
};


const Button = onlyUpdateForKeys(['value', 'item'])(B);


const style = {
    main: {
        marginTop: 15,
    },
    label: {
        marginBottom: 5,
        display: 'block',
    },
};

const MultiChoiceInput = ({options, input, label, meta: {error, warning}}) =>
    <div style={style.main}>
        <span style={style.label}>{label}</span>
        {options.map(o =>
            <Button key={o.label} item={o} input={input} />,
        )}
        {(error && <span className="error">{error}</span>) || (warning && <span className="error">{warning}</span>)}
    </div>;


MultiChoiceInput.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func,
    }).isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    meta: PropTypes.shape({}).isRequired,
    label: PropTypes.string.isRequired,
};

export default onlyUpdateForKeys(['options', 'input', 'label', 'meta'])(MultiChoiceInput);

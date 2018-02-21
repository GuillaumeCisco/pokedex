import React, {PropTypes} from 'react';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';

const Clearable = (ComposedComponent) => {
    class Component extends React.Component {

        constructor(props) {
            super(props);
            this.clear = this.clear.bind(this);
            this.getRef = this.getRef.bind(this);

            this.style = {
                main: {
                    position: 'relative',
                    width: 256,
                },
                composedComponent: {
                    width: 'calc(100% - 28px)',
                },
                icon: {
                    position: 'absolute',
                    top: '38px',
                    right: '4px',
                    padding: '0',
                    width: '24px',
                    height: '24px',
                },
            };
        }

        getRef(c) {
            this.component = c;
        }

        clear(event) {
            event.preventDefault();
            this.component.clear();
        }

        render() {
            const {input, style, meta: {touched, error}} = this.props;

            return (
                <div style={{...this.style.main, ...style}}>
                    <ComposedComponent
                        ref={this.getRef}
                        {...this.props}
                        style={this.style.composedComponent}
                    />
                    {input.value &&
                    <IconButton onClick={this.clear} style={this.style.icon}>
                        <Clear />
                    </IconButton>
                    }
                    {touched && error &&
                    <span className="error">{this.props.error}</span>}
                </div>
            );
        }
    }

    Component.propTypes = {
        input: PropTypes.shape({
            onChange: PropTypes.func.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.string.isRequired,
                PropTypes.number.isRequired,
                PropTypes.shape({}).isRequired,
                PropTypes.arrayOf(PropTypes.string),
            ]),
        }).isRequired,
        meta: PropTypes.shape({
            touched: PropTypes.bool.isRequired,
            error: PropTypes.string.isRequired,
        }).isRequired,
        error: PropTypes.string.isRequired,
        style: PropTypes.shape({}).isRequired,
    };

    return Component;
};

export default Clearable;


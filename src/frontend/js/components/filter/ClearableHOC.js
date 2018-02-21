import React, {PropTypes} from 'react';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';

const HOC = (ComposedComponent, style) => {
    class Clearable extends React.Component {

        constructor(props) {
            super(props);
            this.clear = this.clear.bind(this);
            this.getRef = this.getRef.bind(this);
            this.style = {
                main: {
                    position: 'relative',
                    width: 200,
                    ...(style ? style.main : {}),
                },
                clear: {
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginLeft: '4px',
                    padding: '0',
                    width: '24px',
                    height: '24px',
                    ...(style ? style.clear : {}),
                },
                composedComponent: {
                    width: 'calc(100% - 28px)',
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
            const {value, style} = this.props;

            return (
                <div style={{...this.style.main, ...style}}>
                    <ComposedComponent
                        ref={this.getRef}
                        {...this.props}
                        style={this.style.composedComponent}
                    />
                    {typeof value !== 'undefined' && value !== null &&
                    <IconButton onClick={this.clear} style={this.style.clear} >
                        <Clear />
                    </IconButton>
                    }
                </div>
            );
        }
    }

    Clearable.propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.shape({}),
        ]),
        style: PropTypes.shape({}),
    };

    Clearable.defaultProps = {
        value: null,
        style: null,
    };

    return Clearable;
};

export default HOC;


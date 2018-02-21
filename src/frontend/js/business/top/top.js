/**
 * Created by guillaume on 10/13/16.
 */
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {capitalize} from 'lodash';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {fullWhite} from 'material-ui/styles/colors';

import topActions from './actions';

class Top extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.toggleCreateModal = this.toggleCreateModal.bind(this);

        this.style = {
            topBar: {
                backgroundColor: this.props.context.muiTheme ? this.props.context.muiTheme.palette.primary1Color : 'black',
            },
            icon: {
                style: {
                    padding: '0 20px',
                },
                iconStyle: {
                    color: '#fff',
                },
            },
            toolbar: {
                fontSize: '16px',
                marginLeft: '15px',
                color: '#fff',
            },
            flat: {
                color: '#fff',
            },
            email: {
                color: '#fff',
                marginTop: 3,
            },
        };
    }

    handleToggle() {
        this.props.setDrawer(!this.props.open);
    }

    toggleCreateModal() {
        this.props[this.props.create[this.props.title]](true);
    }

    render() {
        const {signOut, title} = this.props;

        return (
            <Toolbar style={this.style.topBar}>
                <ToolbarGroup firstChild>
                    <IconButton
                        onClick={this.handleToggle}
                        style={this.style.icon.style}
                        iconStyle={this.style.icon.iconStyle}
                    >
                        <NavigationMenu />
                    </IconButton>
                    <ToolbarTitle text={capitalize(title.replace('_', ' '))} style={this.style.toolbar} />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

Top.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    create: PropTypes.shape({}),

    setDrawer: PropTypes.func,
    context: PropTypes.shape({
        muiTheme: PropTypes.shape({
            palette: PropTypes.shape({
                primary1Color: PropTypes.string,
            }),
        }),
    }),
};

Top.defaultProps = {
    open: false,
    title: '',
    setDrawer: null,
    create: {},
    context: {},
};

function mapStateToProps(state, ownProps) {
    return {
        open: state.top.open,
        title: state.top.title,
        create: ownProps.create.props,
        context: ownProps.context,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators({
        setDrawer: topActions.top.set,
        ...(ownProps.create.dispatch), // bind create function from App
    }, dispatch);
}

export default onlyUpdateForKeys(['user', 'signOut', 'title'])(connect(mapStateToProps, mapDispatchToProps)(Top));

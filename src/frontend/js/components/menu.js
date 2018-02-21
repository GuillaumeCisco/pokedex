import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import topActions from '../business/top/actions';
import Pokeball from '../presentation/icons/pokeball';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.handleNavigation = this.handleNavigation.bind(this);
        this.goToPokemon = this.goToPokemon.bind(this);
        this.setDrawer = this.setDrawer.bind(this);
        this.style = {
            menuItem: {
                cursor: 'pointer',
            },
        };
    }

    setDrawer(e) {
        this.props.setDrawer(e);
    }

    goToPokemon() {
        this.handleNavigation(this.props.url.models.pokemon);
    }

    handleNavigation(route) {
        if (this.props.location.pathname !== route) {
            this.props.push(route);
        }
        this.props.setDrawer(false);
    }

    render() {
        const {open} = this.props;

        return (<Drawer
            key="drawer"
            docked={false}
            width={200}
            open={open}
            onRequestChange={this.setDrawer}
        >
            <nav>
                <MenuItem
                    style={this.style.menuItem}
                    onTouchTap={this.goToPokemon}
                    primaryText="Pokemon"
                    rightIcon={<Pokeball />}
                />
            </nav>
        </Drawer>
        );
    }
}

Menu.propTypes = {
    open: PropTypes.bool,
    url: PropTypes.shape({
        models: PropTypes.shape({
            pokemon: PropTypes.string,
        }),
    }),

    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
    push: PropTypes.func,

    setDrawer: PropTypes.func,
};

Menu.defaultProps = {
    open: false,
    url: null,
    location: null,
    setDrawer: null,
    push: null,
};

const url = {
    models: {
        pokemon: '/pokemon',
    },
};

function mapStateToProps(state) {
    return {
        open: state.top.open,
        url,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setDrawer: topActions.top.set,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(onlyUpdateForKeys(['open'])(Menu)));

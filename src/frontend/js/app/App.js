import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import actions from './actions';
import pokemonActions from '../business/models/pokemon/actions';

import Top from '../business/top/top';
import Menu from '../components/menu';
import ErrorModal from '../presentation/modals/error';

class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props.onClose('');
    }

    render() {
        const {user, general, create} = this.props;

        return (
            <div className="app">
                <Menu />
                <Top create={create} context={this.context} />
                <ErrorModal
                    isVisible={general.error !== ''}
                    error={general.error}
                    onClose={this.onClose}
                />
            </div>
        );
    }
}

App.propTypes = {
    onClose: PropTypes.func,
    general: PropTypes.shape({}),
    create: PropTypes.shape({}),
};

App.defaultProps = {
    onClose: null,
    general: null,
    create: {},
};

App.contextTypes = {
    muiTheme: PropTypes.shape({}).isRequired,
};

// defined the create from topBar binding
const create = {
    // bind title of page with dispatch
    props: {
        pokemon: 'toggleCreatePokemon',
    },
    // bind func name with actionTypes
    dispatch: {
        toggleCreatePokemon: pokemonActions.modal.create.set,
    },
};

function mapStateToProps(state, ownProps) {
    return {
        general: state.general,
        create,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onClose: actions.error.set,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

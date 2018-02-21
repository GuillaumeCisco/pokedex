import {Route, Redirect} from 'react-router';
import React, {PropTypes} from 'react';

import {createAsyncComponent} from 'react-async-component';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const PokemonRoutes = createAsyncComponent({resolve: () => System.import('./pokemon/routes')});

const RedirectRoute = onlyUpdateForKeys(['location'])(({component}) =>
    <Route
        render={props => props.location.pathname === '/' ?
            <Redirect to={{pathname: '/pokemon'}} /> :
            React.createElement(component, props)}
    />);

RedirectRoute.propTypes = {
    component: PropTypes.func.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
};

RedirectRoute.defaultProps = {
    location: null,
};

// automatically redirect to models pokemon if we signed in and redirection has not been made
export default props =>
    <div className="models">
        <RedirectRoute component={PokemonRoutes} />
    </div>;

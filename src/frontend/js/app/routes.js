import {Route} from 'react-router';
import React, {PropTypes} from 'react';

import {createAsyncComponent} from 'react-async-component';

import ModelsRoute from '../business/models/routes';

const AsyncApp = createAsyncComponent({resolve: () => System.import('./App')});


const PrivateRoute = ({component}) =>
    <Route render={(props) => React.createElement(component, props)}
    />;

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    store: PropTypes.shape({
        getState: PropTypes.func,
    }).isRequired,
};

PrivateRoute.defaultProps = {
    location: null,
};

const Routes = ({store}) =>
    <div id="routes">
        <Route path="/" component={AsyncApp} />
        <div className="middle">
            <Route component={ModelsRoute} />
        </div>
    </div>;

Routes.propTypes = {
    store: PropTypes.shape({}).isRequired,
};

export default Routes;

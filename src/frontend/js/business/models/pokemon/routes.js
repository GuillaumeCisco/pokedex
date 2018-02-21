import {injectReducer} from 'redux-injector';
import {injectSaga} from 'redux-sagas-injector';

import {Route, Switch} from 'react-router';
import React from 'react';

import {createAsyncComponent} from 'react-async-component';

const AsyncComponent = createAsyncComponent({
    resolve: () => {
        const sagas = System.import('./sagas'),
            reducer = System.import('./reducers');

        return Promise.all([sagas, reducer]).then((values) => {
            injectSaga('pokemon', values[0].default);
            injectReducer('models.pokemon', values[1].default);

            // Configure hot module replacement for the reducer
            if (process.env.NODE_ENV !== 'production') {
                if (module.hot) {
                    module.hot.accept('./reducers', () => System.import('./reducers').then((module) => {
                        injectReducer('models.pokemon', module.default);
                    }));
                }
            }

            return System.import('./components/layout');
        });
    },
});


export default props =>
    <Switch>
        <Route exact path="/pokemon" component={AsyncComponent} />
        <Route path="/pokemon/:id" component={AsyncComponent} />
    </Switch>;

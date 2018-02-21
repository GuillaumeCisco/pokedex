import React, {PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Provider} from 'react-redux';
import {Router} from 'react-router';

import variables from '!!sass-variable-loader!../../../css/variables/variables.dev.scss';


// support react-router v4
import syncHistoryWithStore from '../../../lib/react-router-redux/sync';
import DevTools from '../DevTools';

import Routes from '../routes';
import History from '../history/dev';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: variables.baseColor,
    },
});


const Root = ({store}) => {
    const history = syncHistoryWithStore(History, store);

    return (<Provider store={store}>
        <div>
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router history={history}>
                    <Routes store={store} />
                </Router>
            </MuiThemeProvider>
            <DevTools />
        </div>
    </Provider>);
};

Root.propTypes = {
    store: PropTypes.shape({}).isRequired,
};

export default Root;

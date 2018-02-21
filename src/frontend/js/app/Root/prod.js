import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import variables from '!!sass-variable-loader!../../../css/variables/variables.prod.scss';

// support react-router v4
import syncHistoryWithStore from '../../../lib/react-router-redux/sync';

import Routes from '../routes';
import History from '../history/prod';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: variables.baseColor,
    },
});
// For using browserHistory with amazon s3, we need our own domain name (for not impacting customer and record)
// and a custom routerHistory
// http://stackoverflow.com/questions/16267339/s3-static-website-hosting-route-all-paths-to-index-html

/*
 <RoutingRules>
     <RoutingRule>
         <Condition>
             <KeyPrefixEquals>pokedex/</KeyPrefixEquals>
             <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
         </Condition>
         <Redirect>
             <Protocol>https</Protocol>
             <HostName>my.website.com</HostName>
             <ReplaceKeyPrefixWith>pokedex#</ReplaceKeyPrefixWith>
         </Redirect>
     </RoutingRule>
 </RoutingRules>
 */

const Root = ({store}) => {
    // handle custom listen override for replacing fragment url from s3
    const path = (/#(.*)$/.exec(History.location.hash) || [])[1];
    if (path) {
        History.replace(path);
    }

    const history = syncHistoryWithStore(History, store);

    return (
        <Provider store={store}>
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router history={history}>
                    <Routes store={store} />
                </Router>
            </MuiThemeProvider>
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.shape({}).isRequired,
};

export default Root;

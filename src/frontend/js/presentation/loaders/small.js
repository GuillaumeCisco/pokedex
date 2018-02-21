/**
 * Created by guillaume on 10/12/16.
 */

import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const style = {margin: 10.125};

const LoaderSmall = () => <CircularProgress size={29.75} thickness={1.75} style={style} />;

export default LoaderSmall;

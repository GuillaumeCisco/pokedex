import React from 'react';
import HelmetTitle from '../../utils/HelmetTitle';

const HOC = (Components, title = '', className = '') =>
    props => <div className={`layout${className ? ` ${className}` : ''}`}>
        <HelmetTitle {...{title}} />
        {Object.keys(Components).map((name, i) => {
            const Component = Components[name];
            return <Component key={name} {...props} />;
        },
        )}
    </div>;

export default HOC;

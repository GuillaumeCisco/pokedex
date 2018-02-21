/**
 * Created by guillaume on 6/23/16.
 */

import shallowCompare from 'react-addons-shallow-compare';

export default function listChanged(nextProps, nextState) {
    // no need to render for init false or order or location
    if ((this.props.init !== nextProps.init && nextProps.init === false) ||
        (this.props.order !== nextProps.order) ||
        (this.props.location !== nextProps.location)) {
        return false;
    }

    return shallowCompare(this, nextProps, nextState);
}

import React, {PropTypes} from 'react';
import Checkbox from 'material-ui/Checkbox';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';


const CheckBox = props => <Checkbox {...props} />;

CheckBox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onCheck: PropTypes.func.isRequired,
};

export default onlyUpdateForKeys(['label', 'checked'])(CheckBox);

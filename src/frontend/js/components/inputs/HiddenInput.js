/**
 * Created by guillaume on 7/25/16.
 */
import React, {PropTypes} from 'react';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const HiddenInput = ({input, id, type}) =>
    <input type={type} {...input} value={id} />;

HiddenInput.propTypes = {
    input: PropTypes.shape({}).isRequired,
    id: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
    ]).isRequired,
    type: PropTypes.string.isRequired,
};

export default onlyUpdateForKeys(['input', 'id', 'type'])(HiddenInput);

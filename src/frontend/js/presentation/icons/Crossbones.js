/**
 * Created by guillaume on 8/16/16.
 */

// Icon

import React, {PropTypes} from 'react';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const CrossBones = ({width, height, style, color}) =>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        style={style}
    >
        <path
            fill={color}
            d="M74.805,67.858c-2.531-1.254-5.6-0.219-6.854,2.314l-9.195-4.553l9.195-4.553  c1.252,2.533,4.322,3.57,6.854,2.316c2.53-1.254,3.568-4.323,2.315-6.856c-0.691-1.395-1.934-2.33-3.331-2.686  c0.565-1.328,0.573-2.883-0.116-4.277c-1.255-2.532-4.324-3.568-6.855-2.314c-2.532,1.253-3.57,4.322-2.316,6.855L50,61.285  l-14.503-7.18c1.254-2.533,0.216-5.602-2.316-6.855c-2.532-1.254-5.601-0.218-6.855,2.314c-0.69,1.394-0.682,2.949-0.117,4.277  c-1.398,0.355-2.64,1.291-3.331,2.686c-1.253,2.533-0.216,5.603,2.315,6.856c2.532,1.254,5.602,0.217,6.855-2.316l9.196,4.553  l-9.195,4.553c-1.254-2.533-4.322-3.568-6.854-2.314c-2.533,1.254-3.57,4.322-2.316,6.854c0.691,1.395,1.932,2.332,3.331,2.688  c-0.566,1.328-0.572,2.883,0.118,4.275c1.252,2.533,4.322,3.57,6.854,2.316c2.532-1.254,3.568-4.322,2.314-6.855L50,69.955  l14.504,7.181c-1.254,2.533-0.218,5.602,2.314,6.855c2.531,1.254,5.602,0.217,6.854-2.316c0.69-1.393,0.685-2.947,0.118-4.275  c1.399-0.355,2.64-1.293,3.331-2.688C78.375,72.181,77.338,69.112,74.805,67.858z"
        />
        <path
            fill={color}
            d="M50,15.477c-9.734,0-17.625,7.891-17.625,17.625c0,6.52,3.55,12.199,8.812,15.248v4.377  c0,1.213,0.982,2.195,2.195,2.195c1.212,0,2.195-0.982,2.195-2.195h0.063c0,1.213,0.983,2.195,2.195,2.195  c1.212,0,2.195-0.982,2.195-2.195h0c0,1.213,0.982,2.195,2.195,2.195s2.195-0.982,2.195-2.195c0,1.213,0.983,2.195,2.195,2.195  s2.195-0.982,2.195-2.195V48.35c5.263-3.049,8.812-8.728,8.812-15.248C67.625,23.368,59.734,15.477,50,15.477z M44.598,38.484  c-2.464,0-4.462-1.998-4.462-4.462s1.998-4.462,4.462-4.462s4.462,1.998,4.462,4.462S47.062,38.484,44.598,38.484z M55.402,38.484  c-2.464,0-4.462-1.998-4.462-4.462s1.998-4.462,4.462-4.462s4.462,1.998,4.462,4.462S57.866,38.484,55.402,38.484z"
        />
    </svg>;

CrossBones.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    style: PropTypes.shape({}).isRequired,
    color: PropTypes.string.isRequired,
};

export default onlyUpdateForKeys(['width', 'height', 'style', 'color'])(CrossBones);

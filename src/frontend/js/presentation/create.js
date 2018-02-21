/**
 * Created by guillaume on 10/12/16.
 */

import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import create from '../../img/create.png';

const style = {
    main: {
        height: 300,
        width: 300,
        margin: '0 auto',
        textAlign: 'center',
        cursor: 'pointer',
    },
    img: {
        display: 'block',
        margin: '0 auto',
        padding: '40px',
    },
};

const CreatePaper = ({title, onClick}) =>
    <Paper style={style.main} zDepth={3} onClick={onClick}>
        <img src={create} style={style.img} alt="create" />
        <p>{title}</p>
    </Paper>;

CreatePaper.propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export default onlyUpdateForKeys(['title', 'onClick'])(CreatePaper);

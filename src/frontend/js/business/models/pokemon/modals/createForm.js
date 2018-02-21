import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import {BasicFormHOC} from '../../../../components/hoc';
import Form from './form';
import validate from './validate';
import {getItemError} from '../selector';

function mapStateToProps(s, ownProps) {
    const state = s.models.pokemon;

    return {
        formError: getItemError(state),
        onCancel: ownProps.onCancel,
        onConfirm: ownProps.onConfirm,
    };
}

export default connect(mapStateToProps)(reduxForm({
    form: 'CreatePokemon',
    validate,
})(BasicFormHOC(Form, 'Create')));

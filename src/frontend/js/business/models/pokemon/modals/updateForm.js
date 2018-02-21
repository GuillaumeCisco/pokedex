import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Form from './form';
import {BasicFormHOC} from '../../../../components/hoc';
import validate from './validate';
import {getItem, getItemError} from '../selector';

function mapStateToProps(s, ownProps) {
    const state = s.models.pokemon;
    const item = getItem(state);

    return {
        initialValues: item,
        formError: getItemError(state),
        onCancel: ownProps.onCancel,
        onConfirm: ownProps.onConfirm,
        item,
    };
}

export default connect(mapStateToProps)(reduxForm({
    form: 'UpdatePokemon',
    validate,
})(BasicFormHOC(Form, 'Update')));

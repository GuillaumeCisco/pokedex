import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import actions from '../../actions';
import {getError} from '../../selector';

import {CreateItemHOC, CreateDialogHOC} from '../../../../../components/hoc';
import CreatePaper from '../../../../../presentation/create';

// Create Dialog generation
import CreateForm from '../../modals/createForm';

const CreateModal = CreateDialogHOC(CreateForm, 'Create Pokemon');

class Create extends React.PureComponent {
    constructor(props) {
        super(props);
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
    }

    toggleCreateModal() {
        this.props.toggleCreateModal(true);
    }

    render() {
        const {
            loading, count, error, modal,
            onCreateCancel, onCreateConfirm,
        } = this.props;

        return (<div>
            <CreateModal isVisible={modal.create} onCancel={onCreateCancel} onConfirm={onCreateConfirm} />
            {!loading && !count && !error &&
                <CreatePaper onClick={this.toggleCreateModal} title="Create a new Pokemon!" />}
        </div>);
    }
}

// type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
// decl := ReactPropTypes.{type}(.isRequired)?
Create.propTypes = {
    loading: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    modal: PropTypes.shape({}).isRequired,
    error: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.string,
    ]),

    onCreateCancel: PropTypes.func.isRequired,
    onCreateConfirm: PropTypes.func.isRequired,
    toggleCreateModal: PropTypes.func.isRequired,
};

Create.defaultProps = {
    error: null,
};

function mapStateToProps(s, ownProps) {
    const state = s.models.pokemon;

    return {
        loading: state.list.loading,
        count: state.list.count,
        modal: state.modal,
        error: getError(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createItem: actions.item.create.request,
        toggleCreateModal: actions.modal.create.set,
    }, dispatch);
}

export default onlyUpdateForKeys(['loading', 'count', 'error', 'modal'])(connect(mapStateToProps, mapDispatchToProps)(CreateItemHOC(Create)));

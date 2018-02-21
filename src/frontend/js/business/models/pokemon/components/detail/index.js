/**
 * Created by guillaume on 7/11/16.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Card, CardHeader, CardText} from 'material-ui/Card';

import actions from '../../actions';
import {getItem, getItemError, getQuery} from '../../selector';
import LoaderBig from '../../../../../presentation/loaders/big';

import {UpdateItemHOC, ActionsHOC, CreateDialogHOC} from '../../../../../components/hoc';

import UpdateForm from '../../modals/updateForm';


const UpdateModal = CreateDialogHOC(UpdateForm, 'Update Pokemon');
const Actions = ActionsHOC(UpdateModal);

const style = {
    dl: {
        display: 'block',
        marginTop: 30,
    },
};

class Detail extends React.PureComponent {
    componentWillMount() {
        if (this.props.query && typeof this.props.query.update !== 'undefined' && this.props.query.update) {
            this.props.toggleUpdateModal(true);
        }
    }

    render() {
        const {item, loading} = this.props;

        return item ? (
            <Card className="item">
                <CardHeader title={item.name} />,
                <Actions {...this.props} />
                <CardText>
                    {loading && <LoaderBig />}
                    {!loading && <div>
                        <img src={item.sprites && item.sprites.front_default} width="96" height="96" alt="front_default" />
                        <img src={item.sprites && item.sprites.back_default} width="96" height="96" alt="back_default" />
                        <img src={item.sprites && item.sprites.front_shiny} width="96" height="96" alt="front_shiny" />
                        <img src={item.sprites && item.sprites.back_shiny} width="96" height="96" alt="back_shiny" />
                        <dl style={style.dl}>
                            {item.order && [
                                <dt key="label_order">order</dt>,
                                <dd key="value_order">{item.order}</dd>,
                            ]}
                            {item.base_experience && [
                                <dt key="label_base_experience">base_experience</dt>,
                                <dd key="value_base_experience">{item.base_experience}</dd>,
                            ]}
                            {item.height && [
                                <dt key="label_height">height</dt>,
                                <dd key="value_height">{item.height}</dd>,
                            ]}
                            {item.weight && [
                                <dt key="label_weight">weight</dt>,
                                <dd key="value_weight">{item.weight}</dd>,
                            ]}
                        </dl>
                    </div>
                    }
                </CardText>,
            </Card>
        ) : null;
    }
}

Detail.propTypes = {
    query: PropTypes.shape({
        update: PropTypes.string,
    }),
    toggleUpdateModal: PropTypes.func.isRequired,
    item: PropTypes.shape({}),
    loading: PropTypes.bool.isRequired,
};

Detail.defaultProps = {
    item: null,
    query: null,
};

function mapStateToProps(s, ownProps) {
    const state = s.models.pokemon;

    return {
        error: getItemError(state),
        item: getItem(state),
        loading: state.item.loading,
        id: state.item.id,
        modal: state.modal,
        query: getQuery(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteItem: actions.item.delete.request,
        updateItem: actions.item.update.request,

        toggleDeleteModal: actions.modal.delete.set,
        toggleUpdateModal: actions.modal.update.set,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItemHOC(Detail));


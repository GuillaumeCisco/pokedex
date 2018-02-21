import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import topActions from '../../../top/actions';

import List from './list';
import Detail from './detail';
import Create from './create';
import {CreateLayoutHOC} from '../../../../components/hoc';

const Component = CreateLayoutHOC({Create, List, Detail}, 'Pokemons', 'pokemon');

class Layout extends React.Component {
    componentWillMount() {
        // change title
        this.props.setTitle('pokemon');
    }
    render() {
        return <Component {...this.props} />;
    }
}

Layout.propTypes = {
    setTitle: PropTypes.func.isRequired,
};

function mapStateToProps(s, ownProps) {
    return ownProps;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setTitle: topActions.title.set,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);

import React, {PropTypes} from 'react';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.onPage = this.onPage.bind(this);
    }

    onPage() {
        this.props.onPage(this.props.page.url);
    }

    render() {
        const {page, style} = this.props;

        return (<li
            style={{
                ...style.li,
                ...(page.number ? style.link : {}),
                ...(page.current ? style.active : {}),
            }}
        >
            {(!page.current && page.number) ?
                <button style={style.button} onClick={this.onPage}>{page.number}</button> :
                (page.number ?
                    <button style={style.button}>{page.number}</button> :
                    <button style={style.button}>...</button>)}
        </li>);
    }
}

Page.propTypes = {
    page: PropTypes.shape({
        url: PropTypes.string,
    }).isRequired,
    style: PropTypes.shape({}),
    onPage: PropTypes.func.isRequired,
};

Page.defaultProps = {
    style: null,
};

export default onlyUpdateForKeys(['page'])(Page);

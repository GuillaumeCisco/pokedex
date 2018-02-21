import React, {PropTypes} from 'react';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import Page from './page';

class Pagination extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onPrevious = this.onPrevious.bind(this);
        this.onNext = this.onNext.bind(this);

        const {primary1Color} = this.props.context.muiTheme ? this.props.context.muiTheme.palette : 'black';
        this.style = {
            li: {
                display: 'inline-block',
            },
            button: {
                display: 'block',
                border: '1px solid #ccc',
                padding: 5,
                minWidth: 42,
                textAlign: 'center',
                color: 'inherit',
                cursor: 'inherit',
                backgroundColor: 'inherit',
            },
            link: {
                cursor: 'pointer',
                color: primary1Color,
                backgroundColor: '#fff',
            },
            active: {
                backgroundColor: primary1Color,
                color: '#fff',
            },
        };
    }

    onPrevious() {
        this.props.onPage(this.props.previous);
    }

    onNext() {
        this.props.onPage(this.props.next);
    }

    render() {
        const {onPage, next, previous, pages} = this.props;

        return pages.length > 1 ?
            <div>
                <ul>
                    {previous &&
                    <li style={{...this.style.li, ...this.style.link}}>
                        <button style={this.style.button} onClick={this.onPrevious}>&lt;</button>
                    </li>}
                    {pages.map((page, i) => (
                        <Page
                            key={`page_${page.number || Math.random()}`}
                            page={page}
                            onPage={onPage}
                            style={this.style}
                        />
                    ))}
                    {next &&
                    <li style={{...this.style.li, ...this.style.link}}>
                        <button style={this.style.button} onClick={this.onNext}>&gt;</button>
                    </li>}
                </ul>
            </div> : null;
    }
}

Pagination.propTypes = {
    next: PropTypes.string,
    previous: PropTypes.string,
    onPage: PropTypes.func.isRequired,
    pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    context: PropTypes.shape({
        muiTheme: PropTypes.shape({
            palette: PropTypes.shape({}),
        }),
    }),
};

Pagination.defaultProps = {
    next: null,
    previous: null,
    context: {},
};

export default onlyUpdateForKeys(['onPage', 'next', 'previous', 'pages'])(Pagination);

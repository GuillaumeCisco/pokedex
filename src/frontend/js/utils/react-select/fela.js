/**
 * Created by guillaume on 2/23/17.
 */

export default props => ({
    '&.is-focused:not(.is-open)': {
        '> .Select-control': {borderColor: 'rgb(224, 224, 224)'},
    },
    '& .Select-control': {
        cursor: 'pointer',
        border: 'none',
        borderBottom: '1px solid rgb(224, 224, 224)',
        borderRadius: 0,
    },
    '& .Select--single >.Select-control .Select-value': {
        padding: 0,
    },
    '& .Select-placeholder': {
        padding: 0,
    },
    '& .Select-arrow': {
        borderColor: 'rgb(224, 224, 224) transparent transparent',
    },
    '& .is-open .Select-arrow': {
        borderTopColor: 'rgb(224, 224, 224)',
    },
    '& .Select-arrow-zone:hover>.Select-arrow': {
        borderTopColor: 'rgb(224, 224, 224)',
    },
    '& .Select-input': {
        margin: 0,
    },
    '& .Select-multi-value-wrapper .Select-value': {
        color: '#000',
        border: 'none',
        borderRadius: '16px',
        margin: '1px',
        padding: '6px 4px 3px 6px',
        backgroundColor: 'rgb(224, 224, 224)',
        ':hover': {
            backgroundColor: '#d6d6d6',
        },
    },
    '& .Select-multi-value-wrapper .Select-value-icon': {
        float: 'right',
        margin: '1px 1px 0 0',
        border: 'none',
        borderRadius: '50%',
        backgroundColor: '#a6a6a6',
        color: 'rgb(224, 224, 224)',
        padding: '0 4px',
        fontSize: '1.6em',
        lineHeight: '0.95em',
        width: '20px',
        height: '20px',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        ':hover': {
            backgroundColor: '#7f7f7f',
            color: 'rgb(224, 224, 224)',
        },
    },
    '& .Select-menu-outer': {
        border: 'none',
        boxShadow: 'rgba(0, 0, 0, 0.117647) 0 1px 6px, rgba(0, 0, 0, 0.117647) 0 1px 4px',
        zIndex: 2100,
        backgroundColor: '#fff',
        transition: 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        transform: 'scaleY(1)',
        transformOrigin: 'left top 0',
        '& .Select-option': {
            backgroundColor: '#fff',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            ':hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.0980392)',
            },
            '&.is-focused': {
                backgroundColor: 'rgba(0, 0, 0, 0.0980392)',
            },
            '&.is-selected': {
                backgroundColor: 'rgba(0, 0, 0, 0.0980392)',
            },
        },
    },
    fontSize: '1rem',
    margin: '18px 0 0 0',
    ...props.style,
});

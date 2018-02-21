import React, {PropTypes} from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import LoaderSmall from '../loaders/small';

const defaultStyle = {
    main: {
        display: 'inline-block',
    },
    select: {
        width: '100%',
        minWidth: 256,
    },
};

const Select = ({model, onChange, label, style}) =>
    <div style={{...defaultStyle.main, ...style}}>
        {(model.loading || model.next) && <LoaderSmall />}
        {!(model.loading || model.next) &&
        <SelectField hintText={label} floatingLabelText={label} value={model.current} onChange={onChange} style={defaultStyle.select}>
            {model.results.map(o =>
                <MenuItem key={`option_${o.value}`} value={o.value} primaryText={o.label} />)
            }
        </SelectField>
        }
    </div>;

Select.propTypes = {
    model: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ])),
    ]).isRequired,
    label: PropTypes.string,
    style: PropTypes.shape({}),
    onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
    label: '',
    style: null,
};

export default onlyUpdateForKeys(['model', 'label', 'style'])(Select);

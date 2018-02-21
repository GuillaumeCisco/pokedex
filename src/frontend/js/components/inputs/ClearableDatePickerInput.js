import Clearable from './Clearable';
import DatePickerInput from './DatePickerInput';

class ClearableDatePickerInput extends DatePickerInput {
    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
    }
    clear() {
        // We manually reach into the composed component and set it's date to null.
        this.onChange(null, null);
    }
}

export default Clearable(ClearableDatePickerInput);

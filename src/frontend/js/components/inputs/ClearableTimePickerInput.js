import Clearable from './Clearable';
import TimePickerInput from './TimePickerInput';

class ClearableTimePickerInput extends TimePickerInput {
    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
    }
    clear() {
        // We manually reach into the composed component and set it's date to null.
        this.onChange(null, null);
    }
}

export default Clearable(ClearableTimePickerInput);

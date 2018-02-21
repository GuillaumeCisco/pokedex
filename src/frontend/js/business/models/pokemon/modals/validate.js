/**
 * Created by guillaume on 10/7/16.
 */

const validate = (values) => {
    const errors = {};
    const requiredFields = [];

    requiredFields.forEach((field) => {
        if (values && !values[field]) {
            errors[field] = 'Required';
        }
    });

    return errors;
};


export default validate;

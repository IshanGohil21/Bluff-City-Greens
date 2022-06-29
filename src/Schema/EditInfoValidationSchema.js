import * as yup from 'yup';
import { ref } from 'yup';

const EditInfoValidationSchema= yup.object().shape({
    name: yup
        .string()
        .required('Name is required.'),
    phone: yup
        .number()
        .min(999999999,'Mobile should be exactly 10 digits')
        .required(),
});

export default EditInfoValidationSchema;
import * as yup from 'yup';
import { ref } from 'yup';

const SignUpValidationSchema= yup.object().shape({
    name: yup
        .string()
        .required('Name is required.'),
    email: yup
        .string()
        .email()
        .required('Email is required.'),
    mobile: yup
        .number()
        .min(999999999,'Mobile should be exactly 10 digits')
        .required(),
    password: yup
        .string()
        .min(3, 'Password can not be less than 3 characters.')
        .max(11, 'Password can not be more than 12 characters long.')
        .required(),
    passwordConfirm: yup
        .string()
        .label('Password Confirm')
        .required()
        .oneOf([yup.ref('password')], 'Passwords does not match'),
})

export default SignUpValidationSchema;
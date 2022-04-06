import * as  yup from 'yup';



const   SignInValidationSchema= yup.object().shape({
    email: yup
        .string()
        .email()
        .required('Email is required.'),
    mobile: yup
        .number()
        .max(10)
        .required(),
    password: yup
        .string()
        .min(3, 'Password can not be less than 3 characters.')
        .max(11, 'Password can not be more than 12 characters long.')
        .required(),
})
 
export default SignInValidationSchema;
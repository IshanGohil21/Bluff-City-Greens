import * as yup from 'yup';

const  ForgotPasswordvalidationSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required('Email is required.'),
  })

export default ForgotPasswordvalidationSchema;
import * as yup from 'yup';

const AddressValidationSchema = yup.object().shape({
    address_type: yup.number().required('Address Tag is required.'),
    address: yup.string().required('Address is required.'),
    // icon: yup.string().required('Icon is required.'),
    zipCode: yup.number().required('Zip Code is Required.')
})

export default AddressValidationSchema;
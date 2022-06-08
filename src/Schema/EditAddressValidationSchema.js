import * as yup from 'yup';

const EditAddressValidationSchema = yup.object().shape({
    primary_address: yup.string().required('Enter valid Address'),
    zip: yup.number()
    .positive("Zip Number cannot be negative!")
    .integer("Zip Number cannot have decimals or hyphens")
    // .moreThan(9999999, "The zip number must be 7 digits long")
    .required("Zip Number is required!"),
    addition_address_info: yup.string().required('Enter any nearby landmark'),
    is_select: yup.number().required('Type is Required')
})

export default EditAddressValidationSchema;
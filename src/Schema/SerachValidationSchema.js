import * as yup from 'yup'

const SearchValidationSchema = yup.object().shape({
   search:yup.string().min(3,({min}) => `Term length must be more than ${min} letters`)
})

export default SearchValidationSchema;
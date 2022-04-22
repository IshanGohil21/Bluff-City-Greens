import { ADD_IMAGE, ADD_NUMBER, ADD_DETAILS } from "../Action/AuthAction";

const initialState = {
    email: '',
	password: '',
	name: '',
    image: {},
    country_code: '',
    phone_number: '',
}

export default (state = initialState , action ) => {
    switch(action.type) {
        case ADD_DETAILS:
            const name = action.data.name;
            const email = action.data.email;
            const password = action.data.password;
            const phone_number = action.data.phone_number;
            const country_code = action.data.country_code;
            return {
                ...state,
                name: name,
                email:email,
                password: password,
                phone_number: phone_number,
                country_code: country_code,
            }
        // case ADD_NUMBER: 
        //     const phone_number = action.data.phone_number;
        //     const country_code = action.data.country_code;
        //     return {
        //         ...state,
        //         phone_number: phone_number,
        //         country_code: country_code,
        //     }
        case ADD_IMAGE:
            const imageObj = action.dataObj;
            return {
                ...state,
                 image: imageObj,
            }
            default:
                return state;
    }
}
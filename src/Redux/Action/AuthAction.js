export const ADD_NUMBER = 'ADD_NUMBER';
export const ADD_IMAGE = 'ADD_IMAGE';
export const ADD_DETAILS = 'ADD_DETAILS';

export const addDetails = (data) => {
    return {
        type: ADD_DETAILS, data
    }
}
// export const addPhoneNumber = (data) => {
//     return {
//         type: ADD_NUMBER, data
//     }
// }
export const addImage = (dataObj) => {
    return {
        type: ADD_IMAGE, dataObj
    }
}



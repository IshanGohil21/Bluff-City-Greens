export const ADD_ADDRESS = 'ADD_ADDRESS'
export const ACTIVATE_ADDRESS = 'ACTIVATE_ADDRESS'

export const addAddress = ( addressObj ) => {
    return { type: ADD_ADDRESS, address_type: addressObj.address_type , primary_address: addressObj.primary_address, zip: addressObj.zip, addition_address_info:addressObj.addition_address_info }
}

export const activateAddress = (id) => {
    return { type: ACTIVATE_ADDRESS, id: id } 
}
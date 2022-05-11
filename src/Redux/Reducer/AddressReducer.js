import { ADD_ADDRESS, ACTIVATE_ADDRESS } from "../Action/Address";

const initialState = {
    addresses: [],
    activeAddress: ''
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_ADDRESS:
            const tag = action.tag;
            const address = action.address;
            const zip = action.zip

            let newAddress;
            newAddress = { tag,address,zip }
            const addressList = [];
            for( const key in state.addresses ) {
                addressList.push({
                    ...state.addresses[key]
                });
            }
            addressList.push(newAddress);

            let newAddressList = addressList.map( (object,index) => ({ ...object, id: index }))
            return {
                ...state,
                addresses: {...newAddressList}
            }

        case ACTIVATE_ADDRESS:
            const activeId = action.id;
            // const tempList = [];
            // for( const key in state.addresses ) {
            //     tempList.push({
            //         ...state.addresses[key]
            //     });
            // }           
            // const addressToActivate = tempList.find( item => item.id === activeId )
            return{
                ...state,
                // activeAddress: addressToActivate
                activeAddress: activeId
            }
        default:
            return state
    }
}
import { ACTIVATE_PAYMENT, ADD_CARD, GET_CARDS } from "../Action/CardAction";

const initialState = {
    paymentMethods: [],
    activeMethodID: null
}

export default (state = initialState, action ) => {
    switch(action.type) {
        case ACTIVATE_PAYMENT:
            const id = action.id
            return {
                ...state,
                activeMethodID: id 
            }
        case ADD_CARD:
            const data = action.data
            // console.log(data);
            const exp_month = data.expiryDate.substring(0,2)
            const exp_year = data.expiryDate.substring(3)
            // console.log(exp_month);
            // console.log(exp_year);

            const cardObj = {
                // brand: data.brand,
                // customer: data.customer,
                // exp_month: data.exp_month,
                // exp_year: data.exp_year,
                // id: data.id,
                // last4: data.last4,
                // name: data.name
                number: data.number,
                name: data.name,
                exp_year: exp_year,
                exp_month: exp_month,
                // expiryDate: data.expiryDate,
                cvv: data.cvv,
                isActive: data.isActive
            }

            const tempArray = state.paymentMethods
            tempArray.push(cardObj)
            // console.log("from reducer:",tempArray);
            return {
                ...state,
                paymentMethods: tempArray
            }

        default:
            return state;
    }
};
import { ACTIVATE_TIME, PLACE_ORDER } from "../Action/OrderAction";

const initialState = {
    date: '',
    time: '',
    currentOrders: [],
    pastOrders: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIVATE_TIME:
            const date = action.date
            const time = action.time
            // console.log("From Reducer Date:        ", date);
            // console.log("From Reducer Time:        ", time);
            return {
                ...state,
                date: date,
                time: time
            }

        // case PLACE_ORDER: 

        // const data = action.data
        // const oID = state.orders.length

        // const orderObj = {
        //     orderID: oID,
        //     items : data.items,
        //         date : state.date,
        //         time : state.time
        //     deliveryDateTime: state.deliveryDateTime,
        //     orderPlaceDateTime: new Date(),
        //     totalAmount: data.totalAmount,s    
        // }

        // const tempOrders = [...state.orders]
        // tempOrders[oID] = orderObj

        // const tempCurrentOrders = [...state.currentOrders]
        // tempCurrentOrders[oID] = orderObj

        // return {
        //     ...state,
        //     orders: tempOrders,
        //     currentOrders: tempCurrentOrders
        // }

        default:
            return state;
    }
}
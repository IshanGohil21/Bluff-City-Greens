export const ACTIVATE_TIME = 'ACTIVATE_TIME';
export const PLACE_ORDER = 'PLACE_ORDER';

export const placeOrder = (data) => {
    return { type : PLACE_ORDER, data }
}

export const setDateTime = (date, time) => {
    return { type : ACTIVATE_TIME, date, time }
}
export const ACTIVATE_TIME = 'ACTIVATE_TIME';
export const ADD_TIME = 'ADD_TIME';

export const activateTime = (id) => {
    return { type: ACTIVATE_TIME, id }
}

export const addTime = (data) => {
    return { type: ADD_TIME , data }
}
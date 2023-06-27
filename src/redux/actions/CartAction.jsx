import { DECREMENT, GET_CART, INCREMENT, REMOVE_ITEM_CART } from "./ActionTypes"

export const getCartAction = (id, callback = (error, data) => { }) => {
    return {
        type: GET_CART,
        payload: id,
        callback,
    }
}

export const removeCart = (id) => {
    return {
        type: REMOVE_ITEM_CART,
        payload: id,
    }
}

export const increase = (id) => {
    return {
        type: INCREMENT,
        payload: id,
    }
}

export const decrease = (id) => {
    return {
        type: DECREMENT,
        pyaload: id,
    }
}
import { csrfFetch } from "./csrf";

const GET_ALL_ORDERS = 'orders/getAllOrders';

const getOrders = orderList => {
    return {
        type: GET_ALL_ORDERS,
        orderList
    }
}

export const getAllOrders = userId => async dispatch => {
    const response = await csrfFetch(`/api/orders/${userId}`);
    const orderList = await response.json();
    dispatch(getOrders(orderList));
    return orderList;
}

const initialState = {};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ORDERS: {
            state.orderList = action.orderList;
            return { ...state };
        }
        default:
            return state;
    }
}

export default ordersReducer;

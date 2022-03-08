import { csrfFetch } from "./csrf";

const GET_ALL_ORDERS = 'orders/getAllOrders';
const CREATE_ORDER = 'orders/createOrder';

const getOrders = orderList => {
    return {
        type: GET_ALL_ORDERS,
        orderList
    }
}

const createOrder = newOrder => {
    return {
        type: CREATE_ORDER,
        newOrder
    }
}

export const getAllOrders = userId => async dispatch => {
    const response = await csrfFetch(`/api/orders/${userId}`);
    const orderList = await response.json();
    dispatch(getOrders(orderList));
    return orderList;
}

export const createOneOrder = data => async dispatch => {
    const response = await csrfFetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const newOrder = await response.json();
    dispatch(createOrder(newOrder));
    return newOrder;
}

const initialState = {};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ORDERS: {
            state.orderList = action.orderList;
            return { ...state };
        }
        case CREATE_ORDER: {
            return { ...state };
        }
        default:
            return state;
    }
}

export default ordersReducer;

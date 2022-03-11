import { csrfFetch } from "./csrf";

const GET_ALL_ORDERS = 'orders/getAllOrders';
const CREATE_ORDER = 'orders/createOrder';
const EDIT_ORDERS = 'orders/editOrder';

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

const editOrders = editedOrders => {
    return {
        type: EDIT_ORDERS,
        editedOrders
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

export const editAllOrders = data => async dispatch => {
    const response = await csrfFetch(`/api/orders`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const editedOrders = await response.json();
    dispatch(editOrders(editedOrders));
    return editedOrders;
}

const initialState = {};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ORDERS: {
            state.orderList = action.orderList;
            return { ...state };
        }
        case CREATE_ORDER: {
            state.orderList = [...state.orderList];
            return { ...state };
        }
        case EDIT_ORDERS: {
            if (state.orderList) {
                for (let i = 0; i < action.editedOrders.length; i++) {
                    state.orderList = state.orderList.map(order => order.order.id === action.editedOrders[i].id ? { order: action.editedOrders[i], orderInfo: order.orderInfo } : order);
                }
            }
            return { ...state };
        }
        default:
            return state;
    }
}

export default ordersReducer;

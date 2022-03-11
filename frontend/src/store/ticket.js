import { csrfFetch } from "./csrf";

const GET_ALL_TICKETS = 'tickets/getAllTickets';
const CREATE_TICKET = 'tickets/createTicket';
const EDIT_TICKET = 'tickets/editTicket';
const DELETE_TICKET = 'tickets/deleteTicket';

const getTickets = ticketList => {
    return {
        type: GET_ALL_TICKETS,
        ticketList
    }
}

const createTicket = newTickets => {
    return {
        type: CREATE_TICKET,
        newTickets
    }
}

const editTicket = editedTicket => {
    return {
        type: EDIT_TICKET,
        editedTicket
    }
}

const deleteTicket = deletedTicket => {
    return {
        type: DELETE_TICKET,
        deletedTicket
    }
}

export const getAllTickets = eventId => async dispatch => {
    const response = await csrfFetch(`/api/tickets/${eventId}`);
    const ticketList = await response.json();
    dispatch(getTickets(ticketList));
    return ticketList;
}

export const createMoreTickets = data => async dispatch => {
    const response = await csrfFetch('/api/tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const newTickets = await response.json();
    dispatch(createTicket(newTickets));
    return newTickets;
}

export const editOneTicket = data => async dispatch => {
    const response = await csrfFetch('/api/tickets', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const editedTicket = await response.json();
    dispatch(editTicket(editedTicket));
    return editedTicket;
}

export const deleteOneTicket = id => async dispatch => {
    const response = await csrfFetch('/api/tickets', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    });

    const deletedTicket = await response.json();
    dispatch(deleteTicket(deletedTicket));
    return deletedTicket;
}

const initialState = {};

const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TICKETS: {
            state.ticketList = action.ticketList;
            return { ...state };
        }
        case CREATE_TICKET: {
            state.ticketList = [action.newTickets, ...state.ticketList];
            return { ...state };
        }
        case EDIT_TICKET: {
            state.ticketList = state.ticketList.map(ticket => ticket.id === action.editedTicket.id ? action.editedTicket : ticket);
            return { ...state };
        }
        case DELETE_TICKET: {
            state.ticketList = state.ticketList.filter(ticket => ticket.id !== action.deletedTicket.id);
            return { ...state };
        }
        default:
            return state;
    }
}

export default ticketsReducer;

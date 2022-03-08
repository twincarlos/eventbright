import { csrfFetch } from "./csrf";

const GET_ALL_EVENTS = 'events/getAllEvents';
const GET_ONE_EVENT = 'events/getOneEvent';
const CREATE_EVENT = 'events/createEvent';
const GET_EVENTS_BY_HOST = 'events/getEventsByHost';
const EDIT_EVENT = 'events/editEvent';
const DELETE_EVENT = 'events/deleteEvent';

const getEvents = eventList => {
    return {
        type: GET_ALL_EVENTS,
        eventList
    }
}

const getEvent = event => {
    return {
        type: GET_ONE_EVENT,
        event
    }
}

const createEvent = newEvent => {
    return {
        type: CREATE_EVENT,
        newEvent
    }
}

const getEventsByHost = eventList => {
    return {
        type: GET_EVENTS_BY_HOST,
        eventList
    }
}

const editEvent = editedEvent => {
    return {
        type: EDIT_EVENT,
        editedEvent
    }
}

const deleteEvent = deletedEvent => {
    return {
        type: DELETE_EVENT,
        deletedEvent
    }
}

export const getAllEvents = data => async dispatch => {
    let { location, category } = data;
    if (!location) location = 'Any';

    const response = await csrfFetch(`/api/events/search/${location}/${category}`);
    const eventList = await response.json();
    dispatch(getEvents(eventList));
    return eventList;
}

export const getOneEvent = id => async dispatch => {
    const response = await csrfFetch(`/api/events/${id}`);
    const event = await response.json();
    dispatch(getEvent(event));
    return event;
}

export const createOneEvent = data => async dispatch => {
    const response = await csrfFetch('/api/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const newEvent = await response.json();
    dispatch(createEvent(newEvent));
    return newEvent;
}

export const getAllEventsByHost = userId => async dispatch => {
    const response = await csrfFetch(`/api/events/users/${userId}`);
    const eventList = await response.json();
    dispatch(getEventsByHost(eventList));
    return eventList;
}

export const editOneEvent = data => async dispatch => {
    const response = await csrfFetch('/api/events', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const editedEvent = await response.json();
    dispatch(editEvent(editedEvent));
    return editedEvent;
}

export const deleteOneEvent = id => async dispatch => {
    const response = await csrfFetch('/api/events', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    });

    const deletedEvent = await response.json();
    dispatch(deleteEvent(deletedEvent));
    return deletedEvent;
}

const initialState = {};

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_EVENTS: {
            state.eventList = action.eventList;
            return { ...state };
        }
        case GET_ONE_EVENT: {
            state.event = action.event;
            return { ...state };
        }
        case CREATE_EVENT: {
            if (state.eventList) state.eventList = [action.newEvent, ...state?.eventList];
            return { ...state };
        }
        case GET_EVENTS_BY_HOST: {
            state.eventList = action.eventList;
            return { ...state };
        }
        case EDIT_EVENT: {
            state.eventList = state.eventList.map(event => event.id === action.editedEvent.id ? action.editedEvent : event);
            return { ...state };
        }
        case DELETE_EVENT: {
            state.eventList = state.eventList.filter(event => event.id !== action.deletedEvent.id);
            return { ...state };
        }
        default:
            return state;
    }
}

export default eventsReducer;

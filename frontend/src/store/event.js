import { csrfFetch } from "./csrf";

const GET_ALL_EVENTS = 'events/getAllEvents';
const GET_ONE_EVENT = 'events/getOneEvent';
const CREATE_EVENT = 'events/createEvent';
const GET_EVENTS_BY_HOST = 'events/getEventsByHost';

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
        header: {
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

const initialState = {};

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_EVENTS: {
            return { ...state, eventList: action.eventList };
        }
        case GET_ONE_EVENT: {
            return { ...state, event: action.event };
        }
        case CREATE_EVENT: {
            return { ...state, eventList: [action.newEvent, ...state.eventList] };
        }
        case GET_EVENTS_BY_HOST: {
            return { ...state, eventList: action.eventList };
        }
        default:
            return state;
    }
}

export default eventsReducer;

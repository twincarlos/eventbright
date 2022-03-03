import { csrfFetch } from "./csrf";

const GET_ALL_EVENTS = 'events/getAllEvents';

const getEvents = eventList => {
    return {
        type: GET_ALL_EVENTS,
        eventList
    }
}

export const getAllEvents = () => async dispatch => {
    const response = await csrfFetch('/api/events/');
    const eventList = await response.json();
    dispatch(getEvents(eventList));
    return eventList;
}

const initialState = {};

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_EVENTS: {
            return { ...state, eventList: action.eventList };
        }
        default:
            return state;
    }
}

export default eventsReducer;

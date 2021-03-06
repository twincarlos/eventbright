import { csrfFetch } from "./csrf";

const SEARCH_EVENTS = 'events/searchEvents';
const GET_ALL_EVENTS = 'events/getAllEvents';
const GET_ONE_EVENT = 'events/getOneEvent';
const CREATE_EVENT = 'events/createEvent';
const GET_EVENTS_BY_HOST = 'events/getEventsByHost';
const EDIT_EVENT = 'events/editEvent';
const DELETE_EVENT = 'events/deleteEvent';
const GET_MY_LIKED_EVENTS = 'events/getMyLiked/Events';
const GET_LIKED_EVENTS = 'events/getLikedEvents';
const LIKE_EVENT = 'events/likeEvent';
const DISLIKE_EVENT = 'events/dislikeEvent';

const searchEvents = searchList => {
    return {
        type: SEARCH_EVENTS,
        searchList
    }
}

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

const getEventsByHost = eventListByHost => {
    return {
        type: GET_EVENTS_BY_HOST,
        eventListByHost
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

const getMyLikedEvents = myLikedEvents => {
    return {
        type: GET_MY_LIKED_EVENTS,
        myLikedEvents
    }
}

const getLikedEvents = likedEvents => {
    return {
        type: GET_LIKED_EVENTS,
        likedEvents
    }
}

const likeEvent = newLike => {
    return {
        type: LIKE_EVENT,
        newLike
    }
}

const dislikeEvent = newDislike => {
    return {
        type: DISLIKE_EVENT,
        newDislike
    }
}

export const searchAllEvents = data => async dispatch => {
    let name = data;
    if (!data.length) name = 'Any';
    const response = await csrfFetch(`/api/events/name/${name}`);
    const searchList = await response.json();
    dispatch(searchEvents(searchList));
    return searchList;
}

export const getAllEvents = data => async dispatch => {
    let { location, category } = data;
    if (!location.length) location = 'Any';

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
    const eventListByHost = await response.json();
    dispatch(getEventsByHost(eventListByHost));
    return eventListByHost;
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

export const getAllMyLikedEvents = userId => async dispatch => {
    const response = await csrfFetch(`/api/likes/${userId}`);
    const myLikedEvents = await response.json();
    dispatch(getMyLikedEvents(myLikedEvents));
    return myLikedEvents;
}

export const getAllLikedEvents = userId => async dispatch => {
    const response = await csrfFetch(`/api/likes/${userId}`);
    const likedEvents = await response.json();
    dispatch(getLikedEvents(likedEvents));
    return likedEvents;
}

export const likeOneEvent = data => async dispatch => {
    const response = await csrfFetch('/api/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const newLike = await response.json();
    dispatch(likeEvent(newLike));
    return newLike;
}

export const dislikeOneEvent = data => async dispatch => {
    const response = await csrfFetch('/api/likes', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const newDislike = await response.json();
    dispatch(dislikeEvent(newDislike));
    return newDislike;
}

const initialState = {};

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_EVENTS: {
            state.searchList = action.searchList;
            return { ...state };
        }
        case GET_ALL_EVENTS: {
            state.eventList = action.eventList;
            return { ...state };
        }
        case GET_ONE_EVENT: {
            state.event = action.event;
            if (state.newEvent) state.newEvent = null;
            return { ...state };
        }
        case CREATE_EVENT: {
            return { ...state, newEvent: action.newEvent };
        }
        case GET_EVENTS_BY_HOST: {
            state.eventListByHost = action.eventListByHost;
            return { ...state };
        }
        case EDIT_EVENT: {
            if (state.eventListByHost) state.eventListByHost = state.eventListByHost.map(event => event.event.id === action.editedEvent.event.id ? action.editedEvent : event);
            if (state.event) state.event = action.editedEvent;
            return { ...state };
        }
        case DELETE_EVENT: {
            state.eventListByHost = state.eventListByHost.filter(event => event.event.id !== action.deletedEvent.id);
            return { ...state };
        }
        case GET_MY_LIKED_EVENTS: {
            state.myLikedEvents = action.myLikedEvents;
            return { ...state };
        }
        case GET_LIKED_EVENTS: {
            state.likedEvents = action.likedEvents;
            return { ...state };
        }
        case LIKE_EVENT: {
            state.myLikedEvents = [action.newLike, ...state.myLikedEvents];
            return { ...state };
        }
        case DISLIKE_EVENT: {
            state.myLikedEvents = state.myLikedEvents.filter(likedEvent => likedEvent.id !== action.newDislike.id);
            return { ...state };
        }
        default:
            return state;
    }
}

export default eventsReducer;

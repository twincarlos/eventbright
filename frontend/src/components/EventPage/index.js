import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneEvent } from '../../store/event';

import './EventPage.css';

function EventPage() {
    const dispatch = useDispatch();
    const event = useSelector(state => state.event.event?.event);
    const host = useSelector(state => state.event.event?.host);
    const eventId = useParams().id;

    useEffect(() => {
        dispatch(getOneEvent(eventId));
    }, [dispatch, eventId]);

    if (!event || !host) return null;

    return (
        <div id='event-page'>
            <img src={event.image} alt=''></img>
            <div id='event-main'>
                <div id='event-header'>
                    <img src={event.image} alt=''></img>
                    <div id='event-details'>
                        <h1>{event.name}</h1>
                        <p>{event.date}</p>
                        <p>${event.price}</p>
                    </div>
                </div>
                <div id='event-interaction'>
                    <i className="fas fa-share-alt"></i>
                    <i className="far fa-heart"></i>
                    <button>Tickets</button>
                </div>
                <div id='event-info'>
                    <h1>About Event</h1>
                    <p>I haven't implemented this section yet :-(</p>
                </div>
            </div>
        </div>
    );
}

export default EventPage;

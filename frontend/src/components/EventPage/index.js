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
        <div className='event-page'>
            <p>{event.name}</p>
            <p>{host.username}</p>
        </div>
    );
}

export default EventPage;

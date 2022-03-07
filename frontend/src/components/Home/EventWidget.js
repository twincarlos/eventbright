import { NavLink } from 'react-router-dom';

import './Home.css';

function EventWidget({ event }) {
    const date = (new Date(event.date)).toString().split(' ')[0] + ', ' + (new Date(event.date)).toString().split(' ')[1] + ' ' + (new Date(event.date)).toString().split(' ')[2];

    return (
        <div className='event-widget'>
            <NavLink to={`/events/${event.id}`}><img src={event.image}></img></NavLink>
            <div>
                <NavLink to={`/events/${event.id}`}><p className='event-name'>{event.name}</p></NavLink>
                <p className='event-date'>{date}</p>
                <p className='event-location'>{event.venue} * {event.city}, {event.state}</p>
                <p className='event-price'>Starts at ${event.price}</p>
                <p className='event-host'>{event.hostId}</p>
            </div>
        </div>
    );
}

export default EventWidget;

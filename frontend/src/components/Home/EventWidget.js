import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { likeOneEvent, dislikeOneEvent } from '../../store/event';

import './Home.css';

function EventWidget({ event }) {
    const dispatch = useDispatch();
    const date = (new Date(event.event.date)).toString().split(' ')[0] + ', ' + (new Date(event.event.date)).toString().split(' ')[1] + ' ' + (new Date(event.event.date)).toString().split(' ')[2];
    const sessionUser = useSelector(state => state.session.user);
    const likedEvents = useSelector(state => state.event.myLikedEvents);

    return (
        <div className='event-widget'>
            <NavLink to={`/events/${event.event.id}`}><img src={event.event.image} alt=''></img></NavLink>
            <div>
                {
                    likedEvents.find(likedEvent => likedEvent?.id === event.event?.id) ?
                    <i className="fas fa-heart liked-heart" onClick={() => dispatch(dislikeOneEvent({ userId: sessionUser.id, eventId: event.event.id }))}></i>
                        :
                    <i className="far fa-heart" onClick={() => dispatch(likeOneEvent({ userId: sessionUser.id, eventId: event.event.id }))}></i>
                }
                <NavLink to={`/events/${event.event.id}`}><p className='event-name'>{event.event.name}</p></NavLink>
                <p className='event-date'>{date}</p>
                <p className='event-location'>{event.event.venue} * {event.event.city}, {event.event.state}</p>
                <p className='event-price'>Starts at ${((event.tickets.map(ticket => Number(ticket.price))).sort())[0]}</p>
                <p className='event-host'>{event.host.username}</p>
            </div>
        </div>
    );
}

export default EventWidget;

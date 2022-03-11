import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getOneUser } from '../../store/user';
import { getAllEventsByHost } from '../../store/event';
import { getAllOrders } from '../../store/order';
import { getAllMyLikedEvents, getAllLikedEvents, likeOneEvent, dislikeOneEvent } from '../../store/event';
import EditEvent from '../EditEvent';
import OrderWidget from '../OrderWidget';
import { GlobalContext } from '../../context/GlobalContext';

import './UserPage.css';

function UserPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useParams().id;
    const user = useSelector(state => state.user.user);
    const sessionUser = useSelector(state => state.session.user);
    const eventList = useSelector(state => state.event.eventListByHost);
    const orderList = useSelector(state => state.order.orderList);
    const likedEvents = useSelector(state => state.event.likedEvents);
    const myLikedEvents = useSelector(state => state.event.myLikedEvents);
    const [editEvent, setEditEvent] = useState(null);
    const [editTickets, setEditTickets] = useState(null);
    const { tab, setTab } = useContext(GlobalContext);

    useEffect(() => {
        dispatch(getOneUser(userId));
        dispatch(getAllEventsByHost(userId));
        dispatch(getAllOrders(userId));
        dispatch(getAllLikedEvents(userId));
        if (sessionUser) dispatch(getAllMyLikedEvents(sessionUser.id));
    }, [dispatch, userId, sessionUser]);

    if (!user || !eventList) return null;

    return (
        <div id='user-page'>
            {
                editEvent ? <EditEvent event={editEvent} setEditEvent={setEditEvent} tickets={editTickets}/> :
                <>
                    <div id='user-header'>
                        <img src={user.profileImage} alt=''></img>
                        <div id='user-details'>
                            <img src={user.profileImage} alt=''></img>
                            <h1>{user.username}</h1>
                        </div>
                    </div>
                    <ul>
                        <li id={tab === 'Events' ? 'selected' : null} onClick={() => setTab('Events')}>Events</li>
                        <li id={tab === 'Tickets' ? 'selected' : null} onClick={() => setTab('Tickets')}>Tickets</li>
                        <li id={tab === 'Likes' ? 'selected' : null} onClick={() => setTab('Likes')}>Likes</li>
                    </ul>
                    { tab === 'Events' && (<div id='user-event-gallery'>
                        {
                            sessionUser?.id.toString() === userId.toString() ?
                                eventList?.map(event =>
                                <div className='user-event' key={event.event?.id.toString()}>
                                    <NavLink to={`/events/${event.event.id}`}><img src={event.event.image} alt=''></img></NavLink>
                                    <i className="fas fa-pen-nib" onClick={() => {
                                        setEditEvent(event.event);
                                        setEditTickets(event.tickets);
                                    }}></i>
                                    <div className='user-event-details'>
                                        <NavLink to={`/events/${event.event.id}`}><p className='user-event-name'>{event.event?.name}</p></NavLink>
                                        <p className='user-event-date'>{(new Date(event.event.date)).toString().slice(0, 3) + ', ' + (new Date(event.event.date)).toString().slice(4, 10)}</p>
                                        <p className='user-event-location'>{event.event.venue} * {event.event.city}, {event.event.state}</p>
                                        <p className='user-event-price'>Starts at ${event.tickets?.map(ticket => Number(ticket.price)).sort()[0]}</p>
                                    </div>
                                </div>)
                                    :
                                eventList?.map(event =>
                                    <div className='user-event' key={event.event?.id.toString()}>
                                        <NavLink to={`/events/${event.event.id}`}><img src={event.event.image} alt=''></img></NavLink>
                                        {
                                            sessionUser ?
                                            (myLikedEvents.find(myLikedEvent => myLikedEvent.id === event.event.id) ?
                                                <i className="fas fa-heart liked-heart" onClick={() => dispatch(dislikeOneEvent({ userId: sessionUser.id, eventId: event.event.id }))}></i>
                                                    :
                                                <i className="far fa-heart" onClick={() => dispatch(likeOneEvent({ userId: sessionUser.id, eventId: event.event.id }))}></i>)
                                            :
                                            <i className="far fa-heart" onClick={() => history.push('/login')}></i>
                                        }
                                        <div className='user-event-details'>
                                            <NavLink to={`/events/${event.event.id}`}><p className='user-event-name'>{event.event?.name}</p></NavLink>
                                            <p className='user-event-date'>{(new Date(event.event.date)).toString().slice(0, 3) + ', ' + (new Date(event.event.date)).toString().slice(4, 10)}</p>
                                            <p className='user-event-location'>{event.event.venue} * {event.event.city}, {event.event.state}</p>
                                            <p className='user-event-price'>Starts at ${event.tickets?.map(ticket => Number(ticket.price)).sort()[0]}</p>
                                        </div>
                                    </div>)
                        }
                    </div>)}
                    {
                        tab === 'Tickets' && (<div id='user-order-gallery'>
                            { orderList?.map(order => <OrderWidget key={order.order.id.toString()} order={order}/>) }
                        </div>)
                    }
                    {
                        tab === 'Likes' && (
                            <div id='user-ticket-gallery'>
                                {
                                    likedEvents?.map(likedEvent => (<div key={likedEvent.id.toString()} className='liked-event'>
                                        <NavLink to={`/events/${likedEvent.id}`}><img src={likedEvent.image} alt=''></img></NavLink>
                                        {
                                            sessionUser ?
                                                (myLikedEvents.find(myLikedEvent => myLikedEvent.id === likedEvent.id) ?
                                                    <i className="fas fa-heart liked-heart" onClick={() => dispatch(dislikeOneEvent({ userId: sessionUser.id, eventId: likedEvent.id }))}></i>
                                                        :
                                                    <i className="far fa-heart" onClick={() => dispatch(likeOneEvent({ userId: sessionUser.id, eventId: likedEvent.id }))}></i>)
                                                :
                                                <i className="far fa-heart" onClick={() => history.push('/login')}></i>
                                        }
                                        <div className='liked-event-details'>
                                            <NavLink to={`/events/${likedEvent.id}`}><p className='user-event-name'>{likedEvent.name}</p></NavLink>
                                            <p className='liked-event-date'>{(new Date(likedEvent.date)).toString().slice(0, 3) + ', ' + (new Date(likedEvent.date)).toString().slice(4, 10)}</p>
                                            <p className='liked-event-location'>{likedEvent.venue} * {likedEvent.city}, {likedEvent.state}</p>
                                        </div>
                                    </div>))
                                }
                            </div>
                        )
                    }
                </>
            }
        </div>
    );
}

export default UserPage;

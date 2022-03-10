import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getOneEvent } from '../../store/event';
import { Modal } from '../../context/Modal';
import { getAllMyLikedEvents, likeOneEvent, dislikeOneEvent } from '../../store/event';
import SeeTickets from '../TicketsModal/SeeTickets';
import EditEvent from '../EditEvent';

import './EventPage.css';

function EventPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session?.user);
    const event = useSelector(state => state.event.event?.event);
    const host = useSelector(state => state.event.event?.host);
    const tickets = useSelector(state => state.event.event?.tickets);
    const myLikedEvents = useSelector(state => state.event.myLikedEvents);
    const eventId = useParams().id;
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [editEvent, setEditEvent] = useState(false);

    useEffect(() => {
        dispatch(getOneEvent(eventId));
        if (sessionUser) dispatch(getAllMyLikedEvents(sessionUser.id));
    }, [dispatch, eventId, sessionUser]);

    if (!event || !host) return null;

    return (
        <div id='event-page'>
            { editEvent ? <div id='event-page-edit-event'><EditEvent event={event} setEditEvent={setEditEvent} tickets={tickets}/></div> :
            <>
                <img src={event.image} alt=''></img>
                <div id='event-main'>
                    <div id='event-header'>
                        <img src={event.image} alt=''></img>
                        <div id='event-details'>
                            {
                                sessionUser?.id === host?.id ?
                                <div id='edit-delete-event'>
                                    <button onClick={() => setEditEvent(true)}><i className="fas fa-edit"></i> Edit</button>
                                </div>
                                :
                                null
                            }
                            <h1>{event.name}</h1>
                            <p id='event-date'><i className="far fa-calendar-alt"></i> {(new Date(event.date)).toString().slice(4, 10)}</p>
                        </div>
                    </div>
                    <div id='event-interaction'>
                        <i id='share' className="fas fa-share-alt"></i>
                        {
                            sessionUser ?
                                (myLikedEvents.find(myLikedEvent => myLikedEvent.id === event.id) ?
                                    <i className="fas fa-heart liked-heart" onClick={() => dispatch(dislikeOneEvent({ userId: sessionUser.id, eventId: event.id }))}></i>
                                        :
                                    <i className="far fa-heart" onClick={() => dispatch(likeOneEvent({ userId: sessionUser.id, eventId: event.id }))}></i>)
                                :
                                <i className="far fa-heart" onClick={() => history.push('/login')}></i>
                        }
                        <button onClick={() => setShowModal(true)}>Tickets</button>
                    </div>
                    <div id='event-info'>
                        <div id='event-about-left'>
                            <h1>About Event</h1>
                            <p>{event.about}</p>
                        </div>
                        <div id='event-about-right'>
                            <h2>Date</h2>
                            <p>{event.date}</p>
                            <h2>Location</h2>
                            <p>{event.venue}</p>
                            <p>{event.address}</p>
                            <p>{event.city}, {event.state}</p>
                        </div>
                    </div>
                    <div id='event-host'>
                        <NavLink to={`/users/${host.id}`}><img src={host.profileImage} alt=''></img></NavLink>
                        <NavLink to={`/users/${host.id}`}><p id='host-name'>{host.username}</p></NavLink>
                        <p>Organizer of {event.name}</p>
                    </div>
                </div>
                {
                    showModal &&
                    <Modal onClose={() => setShowModal(false)}>
                        <SeeTickets event={event} tickets={tickets}/>
                    </Modal>
                }
            </>
            }
        </div>
    );
}

export default EventPage;

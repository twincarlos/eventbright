import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneEvent } from '../../store/event';
import { getAllTickets } from '../../store/ticket';
import { Modal } from '../../context/Modal';
import SeeTickets from '../TicketsModal/SeeTickets';
import EditEvent from '../EditEvent';

import './EventPage.css';

function EventPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session?.user);
    const event = useSelector(state => state.event.event?.event);
    const host = useSelector(state => state.event.event?.host);
    const tickets = useSelector(state => state.ticket.ticketList);
    const eventId = useParams().id;
    const [showModal, setShowModal] = useState(false);
    const [editEvent, setEditEvent] = useState(false);

    useEffect(() => {
        dispatch(getOneEvent(eventId));
        dispatch(getAllTickets(eventId));
    }, [dispatch, eventId]);

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
                        <i className="far fa-heart"></i>
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
                        <img src={host.profileImage} alt=''></img>
                        <p id='host-name'>{host.username}</p>
                        <p>Organizer of {event.name}</p>
                        <button>Follow</button>
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

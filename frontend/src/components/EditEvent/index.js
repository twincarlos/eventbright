import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editOneEvent, deleteOneEvent } from '../../store/event';
import { editAllOrders } from '../../store/order';

import './EditEvent.css';

function EditEvent({ event, setEditEvent, tickets }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState(event.name);
    const [about, setAbout] = useState(event.about);
    const [image, setImage] = useState(event.image);
    const [venue, setVenue] = useState(event.venue);
    const [address, setAddress] = useState(event.address);
    const [city, setCity] = useState(event.city);
    const [state, setState] = useState(event.state);
    const [category, setCategory] = useState(event.category);
    const [date, setDate] = useState(event.date);
    const [error, setError] = useState(false);
    const [ticketError, setTicketError] = useState(false);

    const [newTickets, setNewTickets] = useState(tickets);

    if (!event) return null;

    const handleEdit = e => {
        e.preventDefault();

        let err = false;

        for (let i = 0; i < newTickets.length; i++) {
            if (!newTickets[i].name.length || !newTickets[i].amount) err = true;
        }

        if (!name.length || !image.length || !venue.length || !address.length || !city.length || !state.length || !category.length || !date.length || err || !newTickets.length) {
            setError(true);
        } else {
            setError(false);
            dispatch(editAllOrders({
                eventId: event.id,
                eventName: name,
                eventDate: date,
                eventImage: image
            }));
            dispatch(editOneEvent({
                id: event.id,
                hostId: sessionUser.id,
                name,
                about,
                image,
                venue,
                address,
                city,
                state,
                country: 'United States',
                category,
                date,
                tickets: newTickets
            }));
            return setEditEvent(null);
        }
    }

    return (
        <div id='edit-event'>
            {error && <p>All fields are required!</p>}
            <form onSubmit={handleEdit}>
                <h1><i className="fas fa-align-right"></i> Event Info</h1>
                <label>Edit name</label>
                <input placeholder='name' type='text' onChange={e => setName(e.target.value)} value={name}></input>
                <label>Edit category</label>
                <input placeholder='category' type='text' onChange={e => setCategory(e.target.value)} value={category}></input>
                <label>Change image</label>
                <input placeholder='image' type='text' onChange={e => setImage(e.target.value)} value={image}></input>

                <h1><i className="fas fa-map-marked-alt"></i> Location</h1>
                <label>Edit venue name</label>
                <input placeholder='venue' type='text' onChange={e => setVenue(e.target.value)} value={venue}></input>
                <label>Edit venue address</label>
                <input placeholder='address' type='text' onChange={e => setAddress(e.target.value)} value={address}></input>
                <label>Edit venue city</label>
                <input placeholder='city' type='text' onChange={e => setCity(e.target.value)} value={city}></input>
                <label>Edit venue state</label>
                <input placeholder='state' type='text' onChange={e => setState(e.target.value)} value={state}></input>

                <h1><i className="fas fa-calendar-alt"></i> Date</h1>
                <label>Change dates</label>
                <input placeholder='date' type='date' onChange={e => setDate(e.target.value)} value={date}></input>
            </form>

            <h1>Edit Event Tickets</h1>
            <button id='add-edit-ticket' onClick={() => setNewTickets([{ id: `0${newTickets.length}`, eventId: event.id, name: '', price: 0, amount: 0 }, ...newTickets])}><i className="fas fa-plus"></i></button>
            {
                ticketError && (<p>You must have at least one ticket</p>)
            }
            {
                newTickets.map(ticket => ticket.delete ? null : (<div key={ticket.id.toString()} className='ticket-info'>
                    <input type='text' placeholder='ticket name' defaultValue={ticket.name} onChange={e => {
                        setNewTickets(newTickets.map(newTicket => newTicket.id === ticket.id ? { id: newTicket.id, name: e.target.value, eventId: newTicket.eventId, price: Number(newTicket.price), amount: Number(newTicket.amount) } : newTicket));
                    }}></input>
                    <input type='number' placeholder='ticket price' defaultValue={ticket.price} onChange={e => {
                        setNewTickets(newTickets.map(newTicket => newTicket.id === ticket.id ? { id: newTicket.id, name: newTicket.name, eventId: newTicket.eventId, price: Number(e.target.value), amount: Number(newTicket.amount) } : newTicket));
                    }}></input>
                    <input type='number' placeholder='ticket availability' defaultValue={ticket.amount} onChange={e => {
                        setNewTickets(newTickets.map(newTicket => newTicket.id === ticket.id ? { id: newTicket.id, name: newTicket.name, eventId: newTicket.eventId, price: Number(newTicket.price), amount: e.target.value } : newTicket));
                    }}></input>
                    <button onClick={() => {
                        newTickets.filter(newTicket => !newTicket.delete).length > 1 ?
                        setNewTickets(newTickets.map(newTicket => newTicket.id === ticket.id ? { id: newTicket.id, name: newTicket.name, eventId: newTicket.eventId, price: Number(newTicket.price), amount: Number(newTicket.amount), delete: true } : newTicket))
                        :
                        setTicketError(true);
                    }}><i className="fas fa-minus"></i></button>
                </div>))
            }
            <button onClick={handleEdit}>Submit</button>
            <button onClick={() => {
                dispatch(deleteOneEvent(event.id));
                setEditEvent(false);
            }}>Delete</button>
            <button onClick={() => setEditEvent(null)}>Cancel</button>
        </div>
    );
}

export default EditEvent;

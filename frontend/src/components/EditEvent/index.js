import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editOneEvent, deleteOneEvent } from '../../store/event';

import './EditEvent.css';

function EditEvent({ event, setEditEvent, tickets, render, setRender }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState(event.name);
    const [image, setImage] = useState(event.image);
    const [venue, setVenue] = useState(event.venue);
    const [address, setAddress] = useState(event.address);
    const [city, setCity] = useState(event.city);
    const [state, setState] = useState(event.state);
    const [price, setPrice] = useState(event.price);
    const [category, setCategory] = useState(event.category);
    const [date, setDate] = useState(event.date);
    const [error, setError] = useState(false);
    const [ticketError, setTicketError] = useState(false);

    const [newTickets, setNewTickets] = useState(tickets);

    if (!event) return null;

    const handleEdit = e => {
        e.preventDefault();

        if (!name.length || !image.length || !venue.length || !address.length || !city.length || !state.length || !category.length || !date.length) {
            setError(true);
        } else {
            setError(false);
            dispatch(editOneEvent({
                id: event.id,
                hostId: sessionUser.id,
                name: name,
                image: image,
                venue: venue,
                address: address,
                city: city,
                state: state,
                country: 'United States',
                category: category,
                date: date,
                tickets: newTickets
            }));

            setRender(!render);
            return setEditEvent(null);
        }
    }

    return (
        <div id='edit-event'>
            {error && <p>All fields are required!</p>}
            <h1>Edit Event</h1>
            <form onSubmit={handleEdit}>
                <input placeholder='name' type='text' onChange={e => setName(e.target.value)} value={name}></input>
                <input placeholder='image' type='text' onChange={e => setImage(e.target.value)} value={image}></input>
                <input placeholder='venue' type='text' onChange={e => setVenue(e.target.value)} value={venue}></input>
                <input placeholder='address' type='text' onChange={e => setAddress(e.target.value)} value={address}></input>
                <input placeholder='city' type='text' onChange={e => setCity(e.target.value)} value={city}></input>
                <input placeholder='state' type='text' onChange={e => setState(e.target.value)} value={state}></input>
                <input placeholder='price' type='number' onChange={e => setPrice(e.target.value)} value={price}></input>
                <input placeholder='category' type='text' onChange={e => setCategory(e.target.value)} value={category}></input>
                <input placeholder='date' type='date' onChange={e => setDate(e.target.value)} value={date}></input>
                <button>Edit</button>
            </form>
            <button onClick={() => {
                dispatch(deleteOneEvent(event.id));
                setRender(!render);
                setEditEvent(false);
            }}>Delete</button>
            <button onClick={() => setEditEvent(null)}>Cancel</button>

            <h1>Edit Event Tickets</h1>
            <button onClick={() => setNewTickets([{ id: `0${newTickets.length}`, eventId: event.id, name: '', price: 0, amount: 0 }, ...newTickets])}>+</button>
            {
                ticketError && (<p>You must have at least one ticket</p>)
            }
            {
                newTickets.map(ticket => ticket.delete ? null : (<div key={ticket.id.toString()} className='edit-event-ticket'>
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
                    }}>X</button>
                </div>))
            }
        </div>
    );
}

export default EditEvent;

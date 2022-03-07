import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOneEvent } from '../../store/event';

import './CreateEvent.css';

function CreateEvent() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const now = new Date(Date.now());
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().length > 1 ? (now.getMonth() + 1).toString() : `0${(now.getMonth() + 1).toString()}`;
    const day = now.getDate().toString().length > 1 ? now.getDate().toString() : `0${now.getDate().toString()}`;
    const today = year + '-' + month + '-' + day;

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [venue, setVenue] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(today);

    const [ticketName, setTicketName] = useState('');
    const [ticketPrice, setTicketPrice] = useState(0);
    const [ticketAvailability, setTicketAvailability] = useState(0);
    const [tickets, setTickets] = useState([]);

    const [error, setError] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        if (!name.length || !image.length || !venue.length || !address.length || !city.length || !state.length || !category.length || !date.length) {
            setError(true);
        } else {
            setError(false);

            dispatch(createOneEvent({
                hostId: sessionUser.id,
                name,
                image,
                venue,
                address,
                city,
                state,
                country: 'United States',
                category,
                date
            }));

            setName('');
            setImage('');
            setVenue('');
            setAddress('');
            setCity('');
            setState('');
            setCategory('');
            setDate(today);
        }
    }

    const handleTicket = e => {
        e.preventDefault();
        const newTicket = {
            idx: tickets.length,
            name: ticketName,
            price: ticketPrice,
            amount: ticketAvailability
        }
        setTickets([...tickets, newTicket]);
        setTicketName('');
        setTicketPrice(0);
        setTicketAvailability(0);
    }

    const removeTicket = (e, idx) => {
        e.preventDefault();
        // const newTickets = tickets.map((ticket, i) => ticket.idx === idx ? null : { idx: i, name: ticket.name, price: ticket.price, amount: ticket.amount });
        const newTickets = (tickets.filter(ticket => ticket.idx !== idx)).map((ticket, i) => {
            return { idx: i, name: ticket.name, price: ticket.price, amount: ticket.amount };
         });
        setTickets(newTickets);
    }

    return (
        <div id='create-event'>
            { error && <p>All fields are required!</p> }
            <form onSubmit={handleSubmit}>
                <h1>Event Info</h1>
                <input placeholder='name' type='text' onChange={e => setName(e.target.value)} value={name}></input>
                <input placeholder='image' type='text' onChange={e => setImage(e.target.value)} value={image}></input>
                <input placeholder='venue' type='text' onChange={e => setVenue(e.target.value)} value={venue}></input>
                <input placeholder='address' type='text' onChange={e => setAddress(e.target.value)} value={address}></input>
                <input placeholder='city' type='text' onChange={e => setCity(e.target.value)} value={city}></input>
                <input placeholder='state' type='text' onChange={e => setState(e.target.value)} value={state}></input>
                <input placeholder='category' type='text' onChange={e => setCategory(e.target.value)} value={category}></input>
                <input placeholder='date' type='date' onChange={e => setDate(e.target.value)} value={date}></input>

                <h1>Tickets</h1>
                <button onClick={handleTicket}>+</button>
                <input type='text' placeholder='ticket name' value={ticketName} onChange={e => setTicketName(e.target.value)}></input>
                <input type='number' placeholder='ticket price' value={ticketPrice} onChange={e => setTicketPrice(e.target.value)}></input>
                <input type='number' placeholder='ticket availability' value={ticketAvailability} onChange={e => setTicketAvailability(e.target.value)}></input>

                { tickets.length ?
                    tickets.map((ticket, idx) => {
                        return (ticket ? (<span key={idx.toString()}>
                            <input type='text' placeholder='ticket name' defaultValue={ticket.name}></input>
                            <input type='number' placeholder='ticket price' defaultValue={ticket.price}></input>
                            <input type='number' placeholder='ticket availability' defaultValue={ticket.amount}></input>
                            <button onClick={(e) => removeTicket(e, idx)}>X</button>
                        </span>) : null)
                    }) : null }

                <h1> </h1>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default CreateEvent;

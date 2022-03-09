import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createOneEvent } from '../../store/event';

import './CreateEvent.css';

function CreateEvent() {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const newEvent = useSelector(state => state.event.newEvent);

    const now = new Date(86400000 + Date.now());
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().length > 1 ? (now.getMonth() + 1).toString() : `0${(now.getMonth() + 1).toString()}`;
    const day = now.getDate().toString().length > 1 ? now.getDate().toString() : `0${now.getDate().toString()}`;
    const today = year + '-' + month + '-' + day;


    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
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
    const [ticketError, setTicketError] = useState(false);

    useEffect(() => {
        if (newEvent) history.push(`/events/${newEvent.id}`);
    }, [dispatch, newEvent, history]);

    const handleSubmit = e => {
        e.preventDefault();

        let err = false;

        for (let i = 0; i < tickets.length; i++) {
            if (!tickets[i].name.length || !tickets[i].amount) err = true;
        }

        if (!name.length || !about.length || !image.length || !venue.length || !address.length || !city.length || !state.length || !category.length || !date.length || ticketError || !tickets.length || err || ((new Date(date)).getTime() <= Date.now())) {
            setError(true);
        } else {
            setError(false);

            dispatch(createOneEvent({
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
                tickets
            }));

            setName('');
            setAbout('');
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

        let error;

        for (let i = 0; i < tickets.length; i++) {
            if (!tickets[i].name.length || !tickets[i].amount) error = true;
        }

        if (!ticketName.length || !ticketAvailability) error = true;

        if (!error) {
            setTicketError(false);
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
        } else {
            setTicketError(true);
        }
    }

    const removeTicket = (e, idx) => {
        e.preventDefault();
        const newTickets = (tickets.filter(ticket => ticket.idx !== idx)).map((ticket, i) => {
            return { idx: i, name: ticket.name, price: ticket.price, amount: ticket.amount };
         });
        setTickets(newTickets);
    }

    return (
        <div id='create-event'>
            { error && <p>All fields are required!</p> }
            <form onSubmit={handleSubmit}>
                <h1><i className="fas fa-align-right"></i> Event Info</h1>
                <label>Name of your event</label>
                <input placeholder='name' type='text' onChange={e => setName(e.target.value)} value={name}></input>
                <label>Tell us about your event</label>
                <textarea placeholder='about' onChange={e => setAbout(e.target.value)} defaultValue={about}></textarea>
                <label>What type of event is it?</label>
                <input placeholder='category' type='text' onChange={e => setCategory(e.target.value)} value={category}></input>
                <label>Add an image</label>
                <input placeholder='image' type='text' onChange={e => setImage(e.target.value)} value={image}></input>

                <h1><i className="fas fa-map-marked-alt"></i> Location</h1>

                <label>Name of venue</label>
                <input placeholder='venue' type='text' onChange={e => setVenue(e.target.value)} value={venue}></input>
                <label>Address</label>
                <input placeholder='address' type='text' onChange={e => setAddress(e.target.value)} value={address}></input>
                <label>City</label>
                <input placeholder='city' type='text' onChange={e => setCity(e.target.value)} value={city}></input>
                <label>State</label>
                <input placeholder='state' type='text' onChange={e => setState(e.target.value)} value={state}></input>

                <h1><i className="fas fa-calendar-alt"></i> Date</h1>
                { ((new Date(date)).getTime() <= Date.now()) && (<p>Date must be in the future</p>) }
                <label>Date</label>
                <input placeholder='date' type='date' onChange={e => setDate(e.target.value)} value={date}></input>

                <h1><i className="fas fa-ticket-alt"></i> Tickets</h1>
                <div className='ticket-info'>
                    <input className='ticket-name' type='text' placeholder='ticket name' value={ticketName} onChange={e => setTicketName(e.target.value)}></input>
                    <input className='ticket-price' type='number' placeholder='ticket price' value={ticketPrice === 0 ? '' : ticketPrice} onChange={e => setTicketPrice(e.target.value)}></input>
                    <input className='ticket-availability' type='number' placeholder='ticket availability' value={ticketAvailability === 0 ? '' : ticketAvailability} onChange={e => setTicketAvailability(e.target.value)}></input>
                    <button onClick={handleTicket}><i className="fas fa-check"></i></button>
                </div>

                { tickets.length ?
                    tickets.map((ticket, idx) => {
                        return (ticket ? (<div key={idx.toString()} className='ticket-info'>
                            <input type='text' placeholder='ticket name' defaultValue={ticket.name} onChange={e => setTickets(tickets.map(myTicket => myTicket.idx === idx ? { idx: myTicket.idx, name: e.target.value, price: Number(myTicket.price), amount: Number(myTicket.amount) } : myTicket))}></input>
                            <input type='number' placeholder='ticket price' defaultValue={ticket.price} onChange={e => setTickets(tickets.map(myTicket => myTicket.idx === idx ? { idx: myTicket.idx, name: myTicket.name, price: Number(e.target.value), amount: Number(myTicket.amount) } : myTicket))}></input>
                            <input type='number' placeholder='ticket availability' defaultValue={ticket.amount} onChange={e => setTickets(tickets.map(myTicket => myTicket.idx === idx ? { idx: myTicket.idx, name: myTicket.name, price: Number(myTicket.price), amount: Number(e.target.value) } : myTicket))}></input>
                            <button onClick={(e) => removeTicket(e, idx)}>X</button>
                        </div>) : null)
                    }) : null }

                <h1> </h1>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default CreateEvent;

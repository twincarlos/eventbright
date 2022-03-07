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
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(today);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createOneEvent({
            hostId: sessionUser.id,
            name,
            image,
            venue,
            address,
            city,
            state,
            country: 'United States',
            price,
            rating: 3.00,
            category,
            date,
            cancelled: false
        }));
        setName('');
        setImage('');
        setVenue('');
        setAddress('');
        setCity('');
        setState('');
        setPrice(0);
        setCategory('');
        setDate(today);
    }

    return (
        <div id='create-event'>
            <form onSubmit={handleSubmit}>
                <input placeholder='name' type='text' onChange={e => setName(e.target.value)} value={name}></input>
                <input placeholder='image' type='text' onChange={e => setImage(e.target.value)} value={image}></input>
                <input placeholder='venue' type='text' onChange={e => setVenue(e.target.value)} value={venue}></input>
                <input placeholder='address' type='text' onChange={e => setAddress(e.target.value)} value={address}></input>
                <input placeholder='city' type='text' onChange={e => setCity(e.target.value)} value={city}></input>
                <input placeholder='state' type='text' onChange={e => setState(e.target.value)} value={state}></input>
                <input placeholder='price' type='number' onChange={e => setPrice(e.target.value)} value={price}></input>
                <input placeholder='category' type='text' onChange={e => setCategory(e.target.value)} value={category}></input>
                <input placeholder='date' type='date' onChange={e => setDate(e.target.value)} value={date}></input>
                <button>Create</button>
            </form>
        </div>
    );
}

export default CreateEvent;
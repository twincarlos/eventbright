import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editOneEvent, deleteOneEvent } from '../../store/event';

import './EditEvent.css';

function EditEvent({ event, setEditEvent }) {
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

    if (!event) return null;

    const handleEdit = e => {
        e.preventDefault();

        if (!name.length || !image.length || !venue.length || !address.length || !city.length || !state.length || !price.length || !category.length || !date.length) {
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
                price: price,
                rating: event.rating,
                category: category,
                date: date,
                cancelled: false
            }));

            return setEditEvent(null);
        }

    };

    return (
        <div id='edit-event'>
            {
                event ?
                <>
                    { error && <p>All fields are required!</p> }
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
                </>
                    :
                    null
            }
            <button onClick={() => {
                dispatch(deleteOneEvent(event.id));
                setEditEvent(false);
            }}>Delete</button>
            <button onClick={() => setEditEvent(null)}>Cancel</button>
        </div>
    );
}

export default EditEvent;

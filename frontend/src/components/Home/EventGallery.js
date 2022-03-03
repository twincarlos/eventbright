import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllEvents } from '../../store/event';

import './Home.css';

function EventGallery() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);

    return (
        <h1>Event Gallery</h1>
    );
}

export default EventGallery;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, getAllMyLikedEvents } from '../../store/event';
import EventWidget from './EventWidget';

import './Home.css';

function Home() {
    const categories = ['Any', 'Fitness', 'Sports', 'Music', 'Food', 'Movies', 'Party'];
    const [category, setCategory] = useState('Any');
    const [input, setInput] = useState('');
    const [location, setLocation] = useState('Any');

    const sessionUser = useSelector(state => state.session.user);
    const eventList = useSelector(state => state.event.eventList);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEvents({ location, category }));
        dispatch(getAllMyLikedEvents(sessionUser.id));
    }, [dispatch, location, category, sessionUser.id]);

    if (!eventList) return null;

    const handleLocation = e => {
        e.preventDefault();
        setLocation(input);
    };

    return (
        <div id='home'>
            <div id='popular-div'>
                <h1>Popular in</h1>
                <form onSubmit={handleLocation}>
                    <input type='text' onChange={e => setInput(e.target.value)}></input>
                    <button>G</button>
                </form>
            </div>
            <ul>
                { categories.map((category, idx) => <li key={idx.toString()} onClick={() => setCategory(category)}>{category}</li>) }
            </ul>
            <div id='event-gallery'>
                { eventList.map(event => <EventWidget key={event.event.id.toString()} event={event}/>) }
            </div>
        </div>
    );
}

export default Home;

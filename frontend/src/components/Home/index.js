import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllEvents } from '../../store/event';

import EventGallery from './EventGallery';

import './Home.css';

function Home() {
    const categories = ['Any', 'Fitness', 'Sports', 'Music', 'Food', 'Movies', 'Party'];
    const [category, setCategory] = useState('Any');
    const [input, setInput] = useState('');
    const [location, setLocation] = useState('Any');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEvents({ location, category }));
    }, [dispatch, location, category]);

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
            <EventGallery />
        </div>
    );
}

export default Home;

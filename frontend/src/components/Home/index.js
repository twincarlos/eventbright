import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, getAllMyLikedEvents } from '../../store/event';
import EventWidget from './EventWidget';

import './Home.css';

function Home() {
    const CATEGORIES = ['Any', 'Charity', 'Fashion', 'Entertainmnet', 'Food', 'Politics', 'Fitness', 'Hobbies', 'Music', 'Religion', 'Sports'];
    const [category, setCategory] = useState('Any');
    const [location, setLocation] = useState('');

    const sessionUser = useSelector(state => state.session.user);
    const eventList = useSelector(state => state.event.eventList);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEvents({ location, category }));
        if (sessionUser) dispatch(getAllMyLikedEvents(sessionUser.id));
    }, [dispatch, location, category, sessionUser?.id, sessionUser]);

    if (!eventList) return null;

    return (
        <>
            <img id='home-image' src='https://www.rollingstone.com/wp-content/uploads/2020/03/ConcertCrowd.jpg' alt=''></img>
            <div id='home'>
                <div id='popular-div'>
                    <h1>Popular in</h1>
                    <input type='text' placeholder='Search for city or state' value={location} onChange={e => setLocation(e.target.value)}></input>
                    { !location.length ? null : <i className="fas fa-times-circle" onClick={() => setLocation('')}></i> }
                </div>
                <ul>
                    { CATEGORIES.map(thisCategory => <li className={thisCategory === category ? 'selected' : null} key={thisCategory} onClick={() => setCategory(thisCategory)}>{thisCategory}</li>) }
                </ul>
                <div id='event-gallery'>
                    {
                        eventList.length ?
                            eventList.map(event => <EventWidget key={event.event.id.toString()} event={event}/>)
                            :
                            <div id='no-events'>
                                <i className="far fa-sad-tear"></i>
                                <p>No events match your search!</p>
                            </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Home;

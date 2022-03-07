import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneUser } from '../../store/user';
import { getAllEventsByHost } from '../../store/event';
import EditEvent from '../EditEvent';

import './UserPage.css';

function UserPage() {
    const dispatch = useDispatch();
    const userId = useParams().id;
    const user = useSelector(state => state.user.user);
    const sessionUser = useSelector(state => state.session.user);
    const eventList = useSelector(state => state.event.eventList);
    const [editEvent, setEditEvent] = useState(null);

    const image = 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80';

    useEffect(() => {
        dispatch(getOneUser(userId));
        dispatch(getAllEventsByHost(userId));
    }, [dispatch, userId]);

    if (!user || !eventList) return null;

    // <i className="far fa-heart"></i>

    return (
        <div id='user-page'>
            {
                editEvent ? <EditEvent event={editEvent} setEditEvent={setEditEvent}/> :
                <>
                    <div id='user-header'>
                        <img src={image} alt=''></img>
                        <div id='user-details'>
                            <img src={image} alt=''></img>
                            <h1>{user.username}</h1>
                        </div>
                    </div>
                    {(sessionUser?.id.toString() === userId.toString() ?
                    eventList.map(event => <span key={event.id.toString()}><p>{event.name}</p><i className="fas fa-edit" onClick={() => setEditEvent(event)}></i></span>)
                    :
                    eventList.map(event => <span key={event.id.toString()}><p>{event.name}</p><i className="far fa-heart"></i></span>))}
                </>
            }
        </div>
    );
}

export default UserPage;

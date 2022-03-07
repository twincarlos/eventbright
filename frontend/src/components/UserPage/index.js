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

    useEffect(() => {
        dispatch(getOneUser(userId));
        dispatch(getAllEventsByHost(userId));
    }, [dispatch, userId]);

    if (!user || !eventList) return null;

    // <i className="far fa-heart"></i>

    return (
        <div id='user-page'>
            <p>{user.username}</p>
            {
                editEvent ? <EditEvent event={editEvent} setEditEvent={setEditEvent}/> :
                    (sessionUser?.id.toString() === userId.toString() ?
                    eventList.map(event => <span key={event.id.toString()}><p>{event.name}</p><i className="fas fa-edit" onClick={() => setEditEvent(event)}></i></span>)
                    :
                    eventList.map(event => <span key={event.id.toString()}><p>{event.name}</p><i className="far fa-heart"></i></span>))
            }
        </div>
    );
}

export default UserPage;

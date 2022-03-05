import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneUser } from '../../store/user';
import { getAllEventsByHost } from '../../store/event';

import './UserPage.css';

function UserPage() {
    const dispatch = useDispatch();
    const userId = useParams().id;
    const user = useSelector(state => state.user.user);
    const eventList = useSelector(state => state.event.eventList);

    useEffect(() => {
        dispatch(getOneUser(userId));
        dispatch(getAllEventsByHost(userId));
    }, [dispatch, userId]);

    if (!user || !eventList) return null;

    return (
        <div id='user-page'>
            <p>{user.username}</p>
            { eventList.map(event => <p key={event.id.toString()}>{event.name}</p>) }
        </div>
    );
}

export default UserPage;

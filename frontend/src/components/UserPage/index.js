import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneUser } from '../../store/user';

import './UserPage.css';

function UserPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const userId = useParams().id;

    useEffect(() => {
        dispatch(getOneUser(userId));
    }, [dispatch, userId]);

    if (!user) return null;

    return (
        <div id='user-page'>
            <p>{user.username}</p>
        </div>
    );
}

export default UserPage;

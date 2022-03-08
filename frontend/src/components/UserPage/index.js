import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneUser } from '../../store/user';
import { getAllEventsByHost } from '../../store/event';
import { getAllOrders } from '../../store/order';
import EditEvent from '../EditEvent';
import OrderWidget from '../OrderWidget';

import './UserPage.css';

function UserPage() {
    const dispatch = useDispatch();
    const userId = useParams().id;
    const user = useSelector(state => state.user.user);
    const sessionUser = useSelector(state => state.session.user);
    const eventList = useSelector(state => state.event.eventList);
    const orderList = useSelector(state => state.order.orderList);
    const [editEvent, setEditEvent] = useState(null);

    const image = 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80';

    useEffect(() => {
        dispatch(getOneUser(userId));
        dispatch(getAllEventsByHost(userId));
        dispatch(getAllOrders(userId));
    }, [dispatch, userId]);

    if (!user || !eventList) return null;

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
                    <h1>User Events</h1>
                    {(sessionUser?.id.toString() === userId.toString() ?
                    eventList.map(event => <span key={event.id.toString()}><p>{event.name}</p><i className="fas fa-edit" onClick={() => setEditEvent(event)}></i></span>)
                    :
                    eventList.map(event => <span key={event.id.toString()}><p>{event.name}</p><i className="far fa-heart"></i></span>))}
                </>
            }

            <h1>User Orders</h1>
            {
                orderList?.map(order => <OrderWidget key={order.orderId.toString()} order={order}/>)
            }
        </div>
    );
}

export default UserPage;

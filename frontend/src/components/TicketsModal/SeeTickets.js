import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createOneOrder } from '../../store/order';
import { GlobalContext } from '../../context/GlobalContext';

import './TicketsModal.css';

function SeeTickets({ event, tickets }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const date = (new Date(event.date)).toString().split(' ')[0] + ', ' + (new Date(event.date)).toString().split(' ')[1] + ' ' + (new Date(event.date)).toString().split(' ')[2];

    const [order, setOrder] = useState(tickets.map(ticket => ({ ticketName: ticket.name, ticketPrice: ticket.price, userId: sessionUser.id, ticketId: ticket.id, amount: 0 })));

    const { setTab } = useContext(GlobalContext);

    const handleCheckout = () => {
        setTab('Tickets');
        history.push(`/users/${sessionUser.id}`);
        return dispatch(createOneOrder({ order: { userId: sessionUser.id, hostId: event.hostId, eventId: event.id, eventName: event.name, eventDate: event.date, eventImage: event.image }, orderDetails: order.map(myOrder => ({ ticketId: myOrder.ticketId, ticketName: myOrder.ticketName, ticketPrice: myOrder.ticketPrice, amount: myOrder.amount }))}));
    }

    return (
        <div id='see-tickets'>
            <div id='ticket-list-left'>
                <div id='left-header'>
                    <p>{event.name} @ {event.venue}</p>
                    <p>{date}</p>
                </div>
                <div id='tickets-container'>
                    { tickets.map(ticket => (
                        <div className={`ticket ${!ticket.amount ? 'sold-out' : null}`} key={ticket.id.toString()}>
                            <div className='ticket-text'><p className='ticket-name'>{ticket.name}</p><p className='ticket-price'>${ticket.price}</p></div>
                            <div className='ticket-availability'>
                                {
                                    !ticket.amount ? <p>Sold out</p> :
                                        <select onChange={e => setOrder(order.map(order => order.ticketId === ticket.id ? { ticketName: ticket.name, ticketPrice: ticket.price, userId: sessionUser.id, ticketId: ticket.id, amount: Number(e.target.value) } : order))}>{((new Array(ticket.amount + 1)).fill(0)).map((num, idx) =>
                                            <option key={idx.toString()} value={idx}>{idx}</option>)}
                                        </select>
                                }
                            </div>
                        </div>
                    )) }
                </div>
            </div>
            <div id='ticket-checkout-right'>
                <img src={event.image} alt=''></img>
                {
                    order.map(order => order.amount > 0 ?
                    (<div key={order.ticketId.toString()} className='order-info'>
                        <p>{order.amount} x {order.ticketName}</p>
                        <p>${order.amount * order.ticketPrice}</p>
                    </div>) : null)
                }
                {
                    ((order.map(order => order.ticketPrice * order.amount)).reduce((acc, num) => acc + num, 0) > 0 ?
                    <p>Total: ${(order.map(order => order.ticketPrice * order.amount)).reduce((acc, num) => acc + num, 0)}</p> : null)
                }
                <button onClick={handleCheckout} id={(order.map(order => order.ticketPrice * order.amount)).reduce((acc, num) => acc + num, 0) === 0 ? null : 'active'} disabled={(order.map(order => order.ticketPrice * order.amount)).reduce((acc, num) => acc + num, 0) === 0}>Checkout</button>
            </div>
        </div>
    );
}

export default SeeTickets;

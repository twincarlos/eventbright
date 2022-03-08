import { useState } from 'react';
import { useSelector } from 'react-redux';

import './TicketsModal.css';

function SeeTickets({ event, tickets }) {
    const sessionUser = useSelector(state => state.session.user);
    const date = (new Date(event.date)).toString().split(' ')[0] + ', ' + (new Date(event.date)).toString().split(' ')[1] + ' ' + (new Date(event.date)).toString().split(' ')[2];

    const [order, setOrder] = useState(tickets.map(ticket => ({ ticketName: ticket.name, ticketPrice: ticket.price, userId: sessionUser.id, ticketId: ticket.id, amount: 0 })));

    const handleCheckout = () => {
        console.log(order);
    }

    return (
        <div id='see-tickets'>
            <div id='ticket-list-left'>
                <div id='left-header'>
                    <p>{event.name} @ {event.venue}</p>
                    <p>{date}</p>
                </div>
                { tickets.map(ticket => (
                    <div key={ticket.id.toString()} className='ticket'>
                        <div className='ticket-text'><p>{ticket.name}</p><p>${ticket.price}</p></div>
                        <div className='ticket-availability'><select onChange={e => setOrder(order.map(order => order.ticketId === ticket.id ? { ticketName: ticket.name, ticketPrice: ticket.price, userId: sessionUser.id, ticketId: ticket.id, amount: Number(e.target.value) } : order))}>{((new Array(ticket.amount + 1)).fill(0)).map((num, idx) => <option key={idx.toString()} value={idx}>{idx}</option>)}</select></div>
                    </div>
                )) }
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
                    (order.map(order => order.ticketPrice * order.amount)).reduce((acc, num) => acc + num) > 0 ?
                    <p>Total ${(order.map(order => order.ticketPrice * order.amount)).reduce((acc, num) => acc + num)}</p> : null
                }
                <button onClick={handleCheckout} disabled={(order.map(order => order.ticketPrice * order.amount)).reduce((acc, num) => acc + num) === 0}>Checkout</button>
            </div>
        </div>
    );
}

export default SeeTickets;

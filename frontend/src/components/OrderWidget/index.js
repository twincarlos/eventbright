import './OrderWidget.css';

function OrderWidget({ order }) {
    const date = (new Date(order.order.eventDate)).toString().split(' ')[0] + ', ' + (new Date(order.order.eventDate)).toString().split(' ')[1] + ' ' + (new Date(order.order.eventDate)).toString().split(' ')[2] + ', ' + (new Date(order.order.eventDate)).toString().split(' ')[3];

    return (
        <div className='order-widget'>
            <img src={order.order.eventImage} alt=''></img>
            <div className='order-details'>
                <h2>{order.order.eventName}</h2>
                {
                    order.orderInfo.map(myOrder =>
                        !myOrder.amount ? null :
                            <div key={myOrder.id.toString()}>
                                <p>{myOrder.ticketName} x {myOrder.amount} (${myOrder.amount * myOrder.ticketPrice})</p>
                            </div>)
                }
                <p className='order-total'>Total: ${ (order.orderInfo.map(myOrder => myOrder.ticketPrice * myOrder.amount)).reduce((acc, num) => acc + num, 0) }</p>
                <p className='order-date'>{date}</p>
            </div>
        </div>
    );
}

export default OrderWidget;

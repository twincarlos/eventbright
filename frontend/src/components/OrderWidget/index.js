import './OrderWidget.css';

function OrderWidget({ order }) {
    const date = (new Date(order.order.eventDate)).toString().split(' ')[0] + ', ' + (new Date(order.order.eventDate)).toString().split(' ')[1] + ' ' + (new Date(order.order.eventDate)).toString().split(' ')[2] + ', ' + (new Date(order.order.eventDate)).toString().split(' ')[3];

    return (
        <div className='order-widget'>
            <img src={order.order.eventImage} alt=''></img>
            <div className='order-details'>
                <p>{date}</p>
                <h1>{order.order.eventName}</h1>
                {
                    order.orderInfo.map(myOrder => <div key={myOrder.id.toString()}>
                        <p>{myOrder.ticketName} x {myOrder.amount} (${myOrder.amount * myOrder.ticketPrice})</p>
                    </div>)
                }
                <p>Total: ${ (order.orderInfo.map(myOrder => myOrder.ticketPrice * myOrder.amount)).reduce((acc, num) => acc + num, 0) }</p>
            </div>
        </div>
    );
}

export default OrderWidget;

const express = require('express');
const { User, Event, Ticket, Order, OrderDetail } = require('../../db/models');

const router = express.Router();

router.get('/:userId', async (req, res) => {
    const allOrders = await Order.findAll({ where: { userId: req.params.userId } });
    const orderList = [];
    for (let i = 0; i < allOrders.length; i++) {
        const orderDetails = await OrderDetail.findAll({ where: { orderId: allOrders[i].id } });
        const event = await Event.findByPk(allOrders[i].eventId);
        const orderInfo = [];

        for (let k = 0; k < orderDetails.length; k++) {
            const ticket = await Ticket.findByPk(orderDetails[k].ticketId);
            orderInfo.push({ ticketId: ticket.id, ticketName: ticket.name, ticketPrice: ticket.price, amount: orderDetails[k].amount });
        }

        orderList.push({ orderId: allOrders[i].id, event: event.dataValues, orderInfo });
    }
    return res.json(orderList);
});

module.exports = router;

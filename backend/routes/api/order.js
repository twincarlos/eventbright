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

router.post('/', async (req, res) => {
    const newOrder = await Order.create({ userId: req.body[0].userId, eventId: req.body[0].eventId });
    await newOrder.save();

    const orderInfo = [];

    for (let i = 0; i < req.body.length; i++) {
        const orderDetails = await OrderDetail.create({ orderId: newOrder.id, ticketId: req.body[i].ticketId, amount: req.body[i].amount });
        await orderDetails.save();
        orderInfo.push(orderDetails.dataValues);
    }

    return res.json({ orderId: newOrder.id, orderInfo });
});

module.exports = router;

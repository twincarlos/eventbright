const express = require('express');
const { User, Event, Ticket, Order, OrderDetail } = require('../../db/models');

const router = express.Router();

router.get('/:userId', async (req, res) => {
    const allOrders = await Order.findAll({ where: { userId: req.params.userId } });
    const orderList = [];

    for (let i = 0; i < allOrders.length; i++) {
        const orderDetails = await OrderDetail.findAll({ where: { orderId: allOrders[i].id } });
        const event = await Event.findByPk(allOrders[i].eventId);
        const host  = await User.findByPk(event.hostId);
        const orderInfo = [];

        for (let k = 0; k < orderDetails.length; k++) {
            orderInfo.push(orderDetails[k].dataValues);
        }

        orderList.push({ orderId: allOrders[i].id, event, host, orderInfo });
    }
    return res.json(orderList);
});

router.post('/', async (req, res) => {
    const newOrder = await Order.create({ userId: req.body.order.userId, hostId: req.body.order.hostId, eventId: req.body.order.eventId, eventName: req.body.order.eventName, eventDate: req.body.order.eventDate, eventImage: req.body.order.eventImage });
    await newOrder.save();
    const event = await Event.findByPk(req.body.order.eventId);
    const host = await User.findByPk(req.body.order.hostId);

    const orderInfo = [];

    for (let i = 0; i < req.body.orderDetails.length; i++) {
        const orderDetails = await OrderDetail.create({ orderId: newOrder.id, ticketName: req.body.orderDetails[i].ticketName, ticketPrice: req.body.orderDetails[i].ticketPrice, amount: req.body.orderDetails[i].amount });
        await orderDetails.save();
        orderInfo.push(orderDetails.dataValues);
    }

    return res.json({ newOrder, event, host, orderInfo });
});

module.exports = router;

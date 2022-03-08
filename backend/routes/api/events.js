const express = require('express');
const { User, Event, Ticket, OrderDetail, Order } = require('../../db/models');

const router = express.Router();

router.get('/search/:location/:category', async (req, res) => {
    const location = req.params.location;
    const category = req.params.category;

    if (location !== 'Any' && category === 'Any') {
        const eventList = await Event.findAll({ where: { city: location } });
        return res.json(eventList);
    }
    else if (location === 'Any' && category !== 'Any') {
        const eventList = await Event.findAll({ where: { category } });
        return res.json(eventList);
    }
    else if (location !== 'Any' && category !== 'Any') {
        const eventList = await Event.findAll({ where: [{ city: location }, { category }] });
        return res.json(eventList);
    }
    else {
        const eventList = await Event.findAll();
        return res.json(eventList);
    }
});

router.get('/:id', async (req, res) => {
    const event = await Event.findByPk(req.params.id);
    const host = await User.findByPk(event.hostId);

    return res.json({ event, host });
});

router.post('/', async (req, res) => {
    const { hostId, name, image, venue, address, city, state, country, category, date, tickets } = req.body;
    const newEvent = await Event.create({ hostId, name, image, venue, address, city, state, country, category, date });
    await newEvent.save();
    for (let i = 0; i < tickets.length; i++) {
        const newTicket = await Ticket.create({
            name: tickets[i].name,
            eventId: newEvent.id,
            price: tickets[i].price,
            amount: tickets[i].amount
        });
        await newTicket.save();
    }

    return res.json(newEvent);
});

router.get('/users/:userId', async (req, res) => {
    const events = await Event.findAll({ where: { hostId: req.params.userId } });
    const eventList = [];

    for (let i = 0; i < events.length; i++) {
        const event = events[i].dataValues;
        const tickets = await Ticket.findAll({ where: { eventId: events[i].id } });
        eventList.push({ event, tickets });
    }
    return res.json(eventList);
});

router.put('/', async (req, res) => {
    const { tickets } = req.body;
    const editedEvent = await Event.findByPk(req.body.id);
    await editedEvent.update(req.body);
    const newTickets = [];

    for (let i = 0; i < tickets.length; i++) {
        const ticket = await Ticket.findByPk(tickets[i].id);

        if (tickets[i].delete) {
            const orderDetails = await OrderDetail.findAll({ where: { ticketId: tickets[i].id } });
            for (let k = 0; k < orderDetails.length; k++) {
                await orderDetails[k].destroy();
            }
            await ticket.destroy();
        } else if (ticket) {
            await ticket.update({ name: tickets[i].name, eventId: tickets[i].eventId, price: Number(tickets[i].price), amount: tickets[i].amount });
            await ticket.save();
            newTickets.push(ticket.dataValues);
        } else {
            let newTicket = await Ticket.create({ name: tickets[i].name, eventId: tickets[i].eventId, price: Number(tickets[i].price), amount: tickets[i].amount });
            await newTicket.save();
            newTickets.push(newTicket.dataValues);
        }
    }

    return res.json({ event: editedEvent, tickets: newTickets });
});

router.delete('/', async (req, res) => {
    const deletedEvent = await Event.findByPk(req.body.id);
    const tickets = await Ticket.findAll({ where: { eventId: req.body.id } });
    const orders = await Order.findAll({ where: { eventId: req.body.id } });

    for (let i = 0; i < tickets.length; i++) {
        const orderDetails = await OrderDetail.findAll({ where: { ticketId: tickets[i].id } });

        for (k = 0; k < orderDetails.length; k++) {
            await orderDetails[k].destroy();
        }

        await tickets[i].destroy();
    }

    for (let i = 0; i < orders.length; i++) {
        await orders[i].destroy();
    }

    await deletedEvent.destroy();
    return res.json(deletedEvent);
});

module.exports = router;

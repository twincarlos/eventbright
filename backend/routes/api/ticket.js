const express = require('express');
const { User, Event, Ticket } = require('../../db/models');

const router = express.Router();

router.get('/:eventId', async (req, res) => {
    const ticketList = await Ticket.findAll({ where: { eventId: req.params.eventId } });
    return res.json(ticketList);
});

router.post('/', async (req, res) => {
    const { name, eventId, price, amount } = req.body;
    const newTicket = await Ticket.create({ name, eventId, price, amount });
    await newTicket.save();
    return res.json(newTicket);
});

router.put('/', async (req, res) => {
    const editedTicket = await Ticket.findByPk(req.body.id);
    await editedTicket.update(req.body);
    return res.json(editedTicket);
});

router.delete('/', async (req, res) => {
    const deletedTicket = await Ticket.findByPk(req.body.id);
    await deletedTicket.destroy();
    return res.json(deletedTicket);
});

module.exports = router;

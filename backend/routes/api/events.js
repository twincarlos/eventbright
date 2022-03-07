const express = require('express');
const { User, Event } = require('../../db/models');

const router = express.Router();

router.get('/search/:location/:category', async (req, res) => {
    const location = req.params.location;
    const category = req.params.category;

    if (location !== 'Any' && category === 'Any')
    {
        const eventList = await Event.findAll({ where: { city: location } });
        return res.json(eventList);
    }
    else if (location === 'Any' && category !== 'Any')
    {
        const eventList = await Event.findAll({ where: { category } });
        return res.json(eventList);
    }
    else if (location !== 'Any' && category !== 'Any')
    {
        const eventList = await Event.findAll({ where: [{ city: location }, { category }] });
        return res.json(eventList);
    }
    else
    {
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
    const { hostId, name, image, venue, address, city, state, country, category, date } = req.body;
    const newEvent = await Event.create({ hostId, name, image, venue, address, city, state, country, category, date });
    await newEvent.save();
    return res.json(newEvent);
});

router.get('/users/:userId', async (req, res) => {
    const events = await Event.findAll({ where: { hostId: req.params.userId } });
    return res.json(events);
});

router.put('/', async (req, res) => {
    const editedEvent = await Event.findByPk(req.body.id);
    await editedEvent.update(req.body);
    return res.json(editedEvent);
});

router.delete('/', async (req, res) => {
    const deletedEvent = await Event.findByPk(req.body.id);
    await deletedEvent.destroy();
    return res.json(deletedEvent);
});

module.exports = router;

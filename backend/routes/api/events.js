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
    const { hostId, name, image, venue, address, city, state, country, price, rating, category, date, cancelled } = req.body;
    const host = await User.findByPk(hostId);
    const newEvent = await Event.create({ hostId, name, image, venue, address, city, state, country, price, rating, category, date, cancelled });
    await newEvent.save();
    return res.json({ newEvent, host });
});

module.exports = router;

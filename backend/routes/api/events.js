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

module.exports = router;

const express = require('express');
const { User, Event } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    const eventList = await Event.findAll();
    return res.json(eventList);
});

module.exports = router;

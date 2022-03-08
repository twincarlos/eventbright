const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js');
const ticketsRouter = require('./ticket.js');
const ordersRouter = require('./order.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/events', eventsRouter);
router.use('/tickets', ticketsRouter);
router.use('/orders', ordersRouter)

module.exports = router;

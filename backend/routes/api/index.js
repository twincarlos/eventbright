const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js');
const ordersRouter = require('./order.js');
const likesRouter = require('./like');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/events', eventsRouter);
router.use('/orders', ordersRouter);
router.use('/likes', likesRouter);

module.exports = router;

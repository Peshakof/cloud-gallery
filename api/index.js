const router = require('express').Router();
const userRouter = require('./user');
const imageRouter = require('./image');

router.use('/user', userRouter);
router.use('/images', imageRouter);

module.exports = router;
const router = require('express').Router();
const userRouter = require('./user');
const imageRouter = require('./image');
const commentsRouter = require('./comments');

router.use('/user', userRouter);
router.use('/images', imageRouter);
router.use('/comments', commentsRouter);

module.exports = router;
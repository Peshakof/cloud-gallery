const router = require('express').Router();
const { Comment, Image } = require('../models');

router.post('/add', async(req, res, next) => {
  const { image, value } = req.body;
  try {
    const newComment = await Comment.create({image, value})
    await Image.updateOne({_id: image}, { $push: {comments: newComment._id}});
    res.send(newComment)
  } catch (error) {
    next(error)
  }
})

router.get('/getAll/:id', async(req, res, next) => {
  const id = req.params.id
  await Comment.find({image: id})
  .then((com) => {
    res.send(com);
  })
  .catch(next)
})

module.exports = router;
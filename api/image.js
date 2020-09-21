const router = require('express').Router();
const { Image, User } = require('../models');

router.post('/uploadImage', async(req, res, next) => {
    const{title, category, imageUrl, user} = req.body;
    try {
        await Image.create({title, category, imageUrl, user});
        const newImage = await Image.findOne({user});
        await User.updateOne({_id: user}, { $push: {images: newImage._id}});
        res.send('Added new image');
    } catch (error) {
        console.log(error);
    }
})

router.get('/getAll', async(req, res, next) => {
    await Image.find({}).select('imageUrl')
    .then((images) => {
        res.send(images);
    })
    .catch(next);
})

router.get('/getUserImages/:id', async(req, res, next) => {
    const userId = req.params.id;
    await Image.find({user: userId})
        .then((images) => {
            res.send(images);
        })
        .catch(next);
})

router.get('image-info/:id', async(req, res, next) => {
    const imageId = req.params.id;
    await Image.findById(imageId)
    .then(image => {
        res.send(image);
    })
    .catch(next);
})

module.exports = router;
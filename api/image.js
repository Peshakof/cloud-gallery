const router = require('express').Router();
const { Image, User } = require('../models');

router.post('/uploadImage', async(req, res, next) => {
    const{title, category, imageUrl, user, likes} = req.body;
    try {
        await Image.create({title, category, imageUrl, user, likes});
        const newImage = await Image.findOne({user});
        await User.updateOne({_id: user}, { $push: {images: newImage._id}});
        res.send('Added new image');
    } catch (error) {
        console.log(error);
    }
})

router.get('/getAll', async(req, res, next) => {
    await Image.find({})
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

router.get('/image-info/:id', async(req, res, next) => {
    const imageId = req.params.id;
    await Image.findById(imageId)
    .then(image => {
        res.send(image);
    })
    .catch(next);
})

router.put('/remove/:id', async(req, res, next) => {
    const {userId} = req.body;
    const imageId = req.params.id;
    try {
        await User.updateOne({_id: userId}, {$pull: {images: imageId}});
        await Image.findByIdAndRemove(imageId);
        res.send('Image deleted');
    } catch (error) {
        next(error);
    }
})

router.put('/edit/:id', async(req, res, next) => {
    const imageId = req.params.id;
    const image = req.body;
    try {
        await Image.updateOne({_id: imageId}, image )
            .then(() => {
                res.send('image updated')
            })
    } catch (error) {
        next(error)
    }
})

module.exports = router;
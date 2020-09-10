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

module.exports = router;
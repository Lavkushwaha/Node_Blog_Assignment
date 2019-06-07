const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap


const userRoutes = require('./auth.route');
const postRoutes = require('./post.route');
const followRoutes = require('./follow.route');


router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/follow', followRoutes);

module.exports = router;

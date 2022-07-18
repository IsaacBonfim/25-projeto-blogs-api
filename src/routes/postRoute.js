const { Router } = require('express');
const controller = require('../controllers/postController');
const tokenMd = require('../middlewares/tokenMiddleware');

const post = Router();

post.route('/').post(tokenMd, controller.newPost);

module.exports = post;

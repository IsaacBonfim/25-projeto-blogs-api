const { Router } = require('express');
const controller = require('../controllers/userController');
const tokenMd = require('../middlewares/tokenMiddleware');

const user = Router();

user.route('/')
  .post(controller.userCreation)
  .get(tokenMd, controller.getAllUsers);

user.route('/:id')
  .get(tokenMd, controller.getUserById);

module.exports = user;

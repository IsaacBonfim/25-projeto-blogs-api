const { Router } = require('express');
const controller = require('../controllers/userController');

const user = Router();

user.route('/').post(controller.userCreation);

module.exports = user;

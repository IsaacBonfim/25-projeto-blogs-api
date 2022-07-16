const { Router } = require('express');
const controller = require('../controllers/loginController');

const login = Router();

login.route('/').post(controller.login);

module.exports = login;

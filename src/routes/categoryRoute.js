const { Router } = require('express');
const controller = require('../controllers/categoryController');
const tokenMd = require('../middlewares/tokenMiddleware');

const category = Router();

category.route('/')
  .post(tokenMd, controller.newCategory)
  .get(tokenMd, controller.getCategory);

module.exports = category;

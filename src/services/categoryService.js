const model = require('../database/models');

const newCategory = async (name) => {
  if (!name) {
    const error = new Error('"name" is required');
    error.statusCode = 400;
    throw error;
  }

  const category = await model.Category.create(
    { name }, 
    { raw: true },
  );

  return category;
};

const getCategory = async () => {
  const categories = await model.Category.findAll({ raw: true });

  return categories;
};

module.exports = {
  newCategory,
  getCategory,
};
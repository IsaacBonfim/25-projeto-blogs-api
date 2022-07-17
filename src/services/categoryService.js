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

module.exports = {
  newCategory,
};
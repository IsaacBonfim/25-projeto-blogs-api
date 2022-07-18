const model = require('../database/models');

const validateCategory = async (ids) => {
  const categories = await Promise.all(
    ids.map((id) => model.Category.findOne(
      { where: { id } }, { raw: true },
    )),
  );

  if (!categories.every((category) => category)) {
    const error = new Error('"categoryIds" not found');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  validateCategory,
};

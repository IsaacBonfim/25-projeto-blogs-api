const service = require('../services/categoryService');

module.exports = {
  newCategory: async (req, res) => {
    const { name } = req.body;
    const category = await service.newCategory(name);

    res.status(201).json(category);
  },
  getCategory: async (_req, res) => {
    const categories = await service.getCategory();

    res.status(200).json(categories);
  },
};

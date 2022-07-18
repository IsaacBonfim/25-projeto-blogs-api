const service = require('../services/postService');
const categoryFc = require('../helpers/categoryFunctions');

module.exports = {
  newPost: async (req, res) => {
    const { id } = req.user;
    const post = await service.postValidation(req.body);

    await categoryFc.validateCategory(post.categoryIds);

    const newPost = await service.newPost({ id, ...post });

    res.status(201).json(newPost);
  },
};

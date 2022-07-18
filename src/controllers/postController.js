const service = require('../services/postService');
const helper = require('../helpers/helperFunctions');

module.exports = {
  newPost: async (req, res) => {
    const { id } = req.user;
    const post = await service.postValidation(req.body);

    await helper.validateCategory(post.categoryIds);

    const newPost = await service.newPost({ id, ...post });

    res.status(201).json(newPost);
  },
  getAllPosts: async (_req, res) => {
    const postList = await service.getAllPosts();
    const posts = await Promise.all(postList.map((id) => helper.postSearch(id)));

    res.status(200).json(posts);
  },
  getPostById: async (req, res) => {
    const { id } = req.params;
    const post = await service.getPostById(id);

    res.status(200).json(post);
  },
  updatePost: async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    
    const validated = await service.updateValidation(req.body);
    const [post] = await service.updatePost({ ...validated, id, userId });

    const newPost = await service.getPostById(post);

    res.status(200).json(newPost);
  },
};

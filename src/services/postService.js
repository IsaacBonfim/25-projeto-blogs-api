const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const joi = require('joi');
const model = require('../database/models');
const config = require('../database/config/config');
const helper = require('../helpers/helperFunctions');

const sequel = new Sequelize(config.development);

const postValidation = async (obj) => {
  const schema = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    categoryIds: joi.array().required(),
  });

  const post = schema.validate(obj);

  if (post.error) {
    const error = new Error('Some required fields are missing');
    error.statusCode = 400;
    throw error;
  }

  return post.value;
};

const newPost = async ({ id, title, content, categoryIds }) => {
  const post = await sequel.transaction(async (t) => {
    const createdPost = await model.BlogPost.create({
      userId: id, title, content, published: new Date(), updated: new Date(),
    }, { transaction: t, raw: true });
    
    await Promise.all(categoryIds.map((categoryId) => (
      model.PostCategory.create({ postId: createdPost.id, categoryId }, {
        transaction: t, raw: true,
      })
    )));
    
    return { ...createdPost.dataValues, id: createdPost.id };
  });
  
  return post;
};

const getAllPosts = async () => {
  const postList = await model.BlogPost.findAll(
    { attribute: { include: ['id'] } },
    { raw: true },
  );

  const posts = postList.map((post) => post.id);

  return posts;
};

const getPostById = async (id) => {
  const post = helper.postSearch(id);

  return post;
};

const updateValidation = async (obj) => {
  const validation = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
  });

  const update = validation.validate(obj);

  if (update.error) {
    const error = new Error('Some required fields are missing');
    error.statusCode = 400;
    throw error;
  }

  return update.value;
};

const updatePost = async ({ title, content, id, userId }) => {
  if (Number(id) !== userId) {
    const error = new Error('Unauthorized user');
    error.statusCode = 401;
    throw error;
  }

  const post = await model.BlogPost.update(
    { title, content, updated: new Date() },
    { where: { id }, raw: true },
  );

  return post;
};

const deletePost = async (id, userId) => {
  const post = await model.BlogPost.findOne(
    { where: { id }, raw: true },
  );

  helper.postVerify(post, userId);

  await model.PostCategory.destroy({ where: { postId: id } });
  await model.BlogPost.destroy({ where: { id }, raw: true });

  return post;
};

const searchPost = async (search) => {
  const postList = await model.BlogPost.findAll({
    where: { [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ],
    },
  });

  const posts = postList.map(({ id }) => id);

  return posts;
};

module.exports = {
  postValidation,
  newPost,
  getAllPosts,
  getPostById,
  updateValidation,
  updatePost,
  deletePost,
  searchPost,
};

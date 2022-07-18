const Sequelize = require('sequelize');
const joi = require('joi');
const model = require('../database/models');
const config = require('../database/config/config');

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

module.exports = {
  postValidation,
  newPost,
  getAllPosts,
};

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

const getCategories = async (post) => {
  const categoriesIds = await model.PostCategory.findAll({
    where: { postId: post.id },
    raw: true,
  });

  const categoryList = await Promise.all(categoriesIds
    .map(({ categoryId }) => model.Category.findOne({ 
      where: { id: categoryId },
      raw: true, 
    })));

  return categoryList;
};

const postSearch = async (id) => {
  const post = await model.BlogPost.findOne(
    { where: { id }, raw: true },
  );

  if (!post) {
    const error = new Error('Post does not exist');
    error.statusCode = 404;
    throw error;
  }

  const user = await model.User.findOne({
    where: { id: post.userId },
    raw: true,
    attributes: { exclude: ['password'] },
  });

  const categories = await getCategories(post);
  
  post.user = user;
  post.categories = categories;

  return post;
};

const postVerify = (post, userId) => {
  if (!post) {
    const error = new Error('Post does not exist');
    error.statusCode = 404;
    throw error;
  }

  if (post.userId !== userId) {
    const error = new Error('Unauthorized user');
    error.statusCode = 401;
    throw error;
  }
};

module.exports = {
  validateCategory,
  postSearch,
  postVerify,
};

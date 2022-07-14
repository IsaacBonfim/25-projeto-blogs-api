const { DataTypes } = require('sequelize');

const attributes = {
  postId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    foreignKey: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    foreignKey: true,
  },
};

/** @param {import('sequelize').Sequelize} sequelize */

module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', attributes, {
    tableName: 'PostCategories',
    timestamps: false,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'posts',
    });
  };

  return PostCategory;
};
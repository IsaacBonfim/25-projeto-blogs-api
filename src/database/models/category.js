const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
};

/** @param {import('sequelize').Sequelize} sequelize */

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', attributes, {
    tableName: 'Categories',
    timestamps: false,
  });
  
  return Category;
};
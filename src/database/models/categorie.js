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
  const Categorie = sequelize.define('Categorie', attributes, {
    tableName: 'Categories',
    timestamps: false,
  });
  
  return Categorie;
};
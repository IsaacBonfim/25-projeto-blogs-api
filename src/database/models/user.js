const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  displayName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
};

/** @param {import('sequelize').Sequelize} sequelize */

module.exports = (sequelize) => {
  const User = sequelize.define('User', attributes, {
    timestamps: false,
    tableName: 'Users',
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'userId', as: 'posts'
    });
  };

  return User;
};

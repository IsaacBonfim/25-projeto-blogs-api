const joi = require('joi');
const model = require('../database/models');

const userValidation = async (obj) => {
  const validation = joi.object({
    displayName: joi.string().min(8),
    email: joi.string().email(),
    password: joi.string().min(6),
    image: joi.string(),
  });

  const user = validation.validate(obj);

  if (user.error) {
    const error = new Error(user.error.message);
    error.statusCode = 400;
    throw error;
  }

  return user.value;
};

const userCreation = async ({ displayName, email, password, image }) => {
  const userCheck = await model.User.findOne({
    where: { email },
    raw: true,
  });

  if (userCheck) {
    const error = new Error('User already registered');
    error.statusCode = 409;
    throw error;
  }

  const user = await model.User.create({ displayName, email, password, image }, {
    raw: true,
  });

  const { password: pass, ...newUser } = user;

  return newUser;
};

const getAllUsers = async () => {
  const users = await model.User.findAll({
    raw: true,
    attributes: { exclude: ['password'] },
  });

  return users;
};

const getUserById = async (id) => {
  const user = await model.User.findOne({
    where: { id },
    raw: true,
  });

  if (!user) {
    const error = new Error('User does not exist');
    error.statusCode = 404;
    throw error;
  }

  const { password, ...newUser } = user;

  return newUser;
};

module.exports = {
  userValidation,
  userCreation,
  getAllUsers,
  getUserById,
};

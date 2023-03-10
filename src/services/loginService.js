const joi = require('joi');
const model = require('../database/models');

const loginValidation = async (obj) => {
  const validation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  const login = validation.validate(obj);

  if (login.error) {
    const error = new Error('Some required fields are missing');
    error.statusCode = 400;
    throw error;
  }

  return login.value;
};

const loginUserValidation = async ({ email, password }) => {
  const user = await model.User.findOne({
    where: { email },
    raw: true,
  });

  if (!user || user.password !== password) {
    const error = new Error('Invalid fields');
    error.statusCode = 400;
    throw error;
  }

  const { password: pass, ...newUser } = user;

  return newUser;
};

module.exports = {
  loginValidation,
  loginUserValidation,
};

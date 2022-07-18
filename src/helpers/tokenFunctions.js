const joi = require('joi');
const jwt = require('jsonwebtoken');

const tokenMaker = async (user) => {
  const payload = { data: user };
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return token;
};

const tokenValidation = async (string) => {
  const validation = joi.string().required();
  const result = validation.validate(string);

  if (result.error) {
    const error = new Error('Token not found');
    error.statusCode = 401;
    throw error;
  }

  return result.value;
};

const tokenVerification = async (token) => {
  const { data } = jwt.verify(token, process.env.JWT_SECRET);

  return data;
};

module.exports = {
  tokenMaker,
  tokenValidation,
  tokenVerification,
};

const jwt = require('jsonwebtoken');

const tokenMaker = async (user) => {
  const payload = { data: user };
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return token;
};

module.exports = tokenMaker;

const tokenFc = require('../helpers/tokenFunctions');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  const validated = await tokenFc.tokenValidation(token);
  const user = await tokenFc.tokenVerification(validated);

  req.user = user;

  next();
};

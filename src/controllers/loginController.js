const service = require('../services/loginService');
const tokenFc = require('../helpers/tokenFunctions');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const validated = await service.loginValidation({ email, password });
    const user = await service.loginUserValidation(validated);
    const token = await tokenFc.tokenMaker(user);

    res.status(200).json({ token });
  },
};

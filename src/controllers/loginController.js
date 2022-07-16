const service = require('../services/loginService');
const tokenMaker = require('../helpers/tokenFunctions');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const validated = await service.loginValidation({ email, password });
    const user = await service.userValidation(validated);
    const token = await tokenMaker(user);

    res.status(200).json({ token });
  },
};

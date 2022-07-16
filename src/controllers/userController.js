const service = require('../services/userService');
const tokenMaker = require('../helpers/tokenFunctions');

module.exports = {
  userCreation: async (req, res) => {
    const validated = await service.userValidation(req.body);
    const user = await service.userCreation(validated);
    const token = await tokenMaker(user);

    res.status(201).json({ token });
  },
};
const service = require('../services/userService');
const tokenFc = require('../helpers/tokenFunctions');

module.exports = {
  userCreation: async (req, res) => {
    const validated = await service.userValidation(req.body);
    const user = await service.userCreation(validated);
    const token = await tokenFc.tokenMaker(user);

    res.status(201).json({ token });
  },
  getAllUsers: async (_req, res) => {
    const users = await service.getAllUsers();

    res.status(200).json(users);
  },
};

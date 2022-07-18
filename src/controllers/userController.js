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
  getUserById: async (req, res) => {
    const { id } = req.params;
    const user = await service.getUserById(id);

    res.status(200).json(user);
  },
  deleteUser: async (req, res) => {
    const { id } = req.user;

    await service.deleteUser(id);

    req.user = '';

    res.status(204).end();
  },
};

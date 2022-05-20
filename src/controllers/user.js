const User = require('../services/user');

const login = async (req, res) => {
  const token = await User.login(req.user);
  return res.status(200).json({ token });
};

const create = async (req, res) => {
  const payload = {
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password,
    image: req.body.image };
  const token = await User.create(payload);
  return res.status(201).json({ token });
};

const getAll = async (req, res) => {
  const users = await User.getAll();
  return res.status(200).json(users);
};

module.exports = {
  login,
  create,
  getAll,
};

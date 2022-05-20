const User = require('../services/user');

const login = async (req, res) => {
  const token = await User.login(req.user);
  return res.status(200).json({ token });
};

module.exports = {
  login,
};

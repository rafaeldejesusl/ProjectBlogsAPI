const { User } = require('../database/models');

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  req.user = user;
  return next();
};

module.exports = loginValidation;

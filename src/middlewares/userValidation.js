const { User } = require('../database/models');

const displayNameValidation = (displayName) => {
  if (!displayName || displayName.length < 8) {
    return false;
  }
  return true;
};

const emailValidation = (email) => {
  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (!email || !reg.test(email)) {
    return false;
  }
  return true;
};

const passwordValidation = (password) => {
  if (!password || password.length < 6) {
    return false;
  }
  return true;
};

const validate = (displayName, email, password) => {
  if (!displayNameValidation(displayName)) {
    return { message: '"displayName" length must be at least 8 characters long' };
  }
  if (!emailValidation(email)) {
    return { message: '"email" must be a valid email' };
  }
  if (!passwordValidation(password)) {
    return { message: '"password" length must be at least 6 characters long' };
  }
  return false;
};

const userValidation = async (req, res, next) => {
  const { email, password, displayName } = req.body;
  const check = validate(displayName, email, password);
  if (check.message) return res.status(400).json(check);
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }
  return next();
};

module.exports = userValidation;
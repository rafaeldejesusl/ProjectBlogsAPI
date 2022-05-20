require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

const login = async (obj) => {
  const payload = {
    id: obj.id,
    displayName: obj.displayName,
    email: obj.email,
    image: obj.image,
  };
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ payload }, JWT_SECRET, jwtConfig);
  return token;
};

const create = async (obj) => {
  const user = await User.create(obj);
  const payload = {
    id: user.id,
    displayName: obj.displayName,
    email: obj.email,
    image: obj.image,
  };
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ payload }, JWT_SECRET, jwtConfig);
  return token;
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

module.exports = {
  login,
  create,
  getAll,
};

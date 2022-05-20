require('dotenv').config();
const jwt = require('jsonwebtoken');

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

module.exports = {
  login,
};

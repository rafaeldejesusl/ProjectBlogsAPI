const { Category } = require('../database/models');

const create = async (obj) => {
  const cat = await Category.create(obj);
  return cat;
};

module.exports = {
  create,
};

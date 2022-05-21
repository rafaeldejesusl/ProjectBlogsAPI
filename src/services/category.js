const { Category } = require('../database/models');

const create = async (obj) => {
  const cat = await Category.create(obj);
  return cat;
};

const getAll = async () => {
  const cat = await Category.findAll();
  return cat;
};

module.exports = {
  create,
  getAll,
};

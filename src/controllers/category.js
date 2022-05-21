const Category = require('../services/category');

const create = async (req, res) => {
  const { name } = req.body;
  const cat = await Category.create({ name });
  return res.status(201).json(cat);
};

const getAll = async (req, res) => {
  const cat = await Category.getAll();
  return res.status(200).json(cat);
};

module.exports = {
  create,
  getAll,
};

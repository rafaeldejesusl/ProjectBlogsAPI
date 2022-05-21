const Category = require('../services/category');

const create = async (req, res) => {
  const { name } = req.body;
  const cat = await Category.create({ name });
  return res.status(201).json(cat);
};

module.exports = {
  create,
};

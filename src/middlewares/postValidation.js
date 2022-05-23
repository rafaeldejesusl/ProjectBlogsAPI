const { Category } = require('../database/models');

const postValidation = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  const categoryList = (await Category.findAll()).map((e) => e.id);
  const check = categoryIds.every((e) => categoryList.includes(e));
  if (!categoryIds || !check) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  req.post = { title, content, categoryIds };
  return next();
};

module.exports = postValidation;

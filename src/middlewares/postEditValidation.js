const { BlogPost, User, Category } = require('../database/models');

const postEditValidation = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { payload } = req.user;
  const post = await BlogPost.findOne({ where: { id }, 
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });
  if (payload.id !== post.userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  req.post = post;
  return next();
};

module.exports = postEditValidation;

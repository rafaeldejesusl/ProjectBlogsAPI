const { BlogPost, User, Category } = require('../database/models');

const postDeleteValidation = async (req, res, next) => {
  const { id } = req.params;
  const { payload } = req.user;
  const post = await BlogPost.findOne({ where: { id }, 
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  if (payload.id !== post.userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  req.post = post;
  return next();
};

module.exports = postDeleteValidation;
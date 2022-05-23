const { BlogPost, PostCategory, User, Category } = require('../database/models');

const create = async (post, user) => {
  const { title, content, categoryIds } = post;
  const { id } = user.payload;
  const createdPost = await BlogPost.create({ title, content, userId: id });
  const list = categoryIds.map(async (e) => PostCategory
    .create({ categoryId: e, postId: createdPost.id }));
  await Promise.all(list);
  return createdPost;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }] });
  return posts;
};

module.exports = {
  create,
  getAll,
};

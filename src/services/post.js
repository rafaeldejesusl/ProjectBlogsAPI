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

const getById = async (id) => {
  const post = await BlogPost.findOne({ where: { id }, 
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });
  if (!post) return false;
  return post;
};

const update = async (title, content, id) => {
  const post = await BlogPost.update({ title, content }, { where: { id } });
  return post;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};

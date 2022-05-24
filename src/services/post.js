const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const create = async (post, user) => {
  const { title, content, categoryIds } = post;
  const { id } = user.payload;
  const t = await sequelize.transaction();
  try {
    const createdPost = await BlogPost.create({ title, content, userId: id }, { transaction: t });
    const list = categoryIds.map(async (e) => PostCategory
      .create({ categoryId: e, postId: createdPost.id }, { transaction: t }));
    await Promise.all(list);
    await t.commit();
    return createdPost;
  } catch (e) {
    return { message: e.message };
  }
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

const erase = async (id) => {
  const post = await BlogPost.destroy({ where: { id } });
  return post;
};

const search = async (query) => {
  if (!query) return getAll();
  const postByTitle = await BlogPost.findAll({ where: { title: { [Op.eq]: query } }, 
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });
  const postByContent = await BlogPost.findAll({ where: { content: { [Op.eq]: query } }, 
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });
  const posts = [...postByTitle, ...postByContent];
  return posts;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  erase,
  search,
};

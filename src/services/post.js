const { BlogPost, PostCategory } = require('../database/models');

const create = async (post, user) => {
  const { title, content, categoryIds } = post;
  const { id } = user.payload;
  const createdPost = await BlogPost.create({ title, content, userId: id });
  const list = categoryIds.map(async (e) => PostCategory
    .create({ categoryId: e, postId: createdPost.id }));
  await Promise.all(list);
  return createdPost;
};

module.exports = {
  create,
};

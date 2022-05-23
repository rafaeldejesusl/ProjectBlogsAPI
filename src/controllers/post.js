const Post = require('../services/post');

const create = async (req, res) => {
  const result = await Post.create(req.post, req.user);
  if (result.messsage) return res.status(500).json(result);
  return res.status(201).json(result);
};

const getAll = async (req, res) => {
  const result = await Post.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.getById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(post);
};

module.exports = {
  create,
  getAll,
  getById,
};

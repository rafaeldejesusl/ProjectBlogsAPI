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

const update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  await Post.update(title, content, id);
  req.post.title = title;
  req.post.content = content;
  return res.status(200).json(req.post);
};

const erase = async (req, res) => {
  const { id } = req.params;
  await Post.erase(id);
  return res.status(204).end();
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  erase,
};

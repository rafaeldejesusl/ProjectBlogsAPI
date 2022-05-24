const express = require('express');
const User = require('./controllers/user');
const Category = require('./controllers/category');
const Post = require('./controllers/post');
const loginValidation = require('./middlewares/loginValidation');
const userValidation = require('./middlewares/userValidation');
const authValidation = require('./middlewares/authValidation');
const categoryValidation = require('./middlewares/categoryValidation');
const postValidation = require('./middlewares/postValidation');
const postEditValidation = require('./middlewares/postEditValidation');
const postDeleteValidation = require('./middlewares/postDeleteValidation');

// ...

const app = express();

app.use(express.json());

app.post('/login', loginValidation, User.login);

app.post('/user', userValidation, User.create);

app.get('/user', authValidation, User.getAll);

app.get('/user/:id', authValidation, User.getById);

app.post('/categories', authValidation, categoryValidation, Category.create);

app.get('/categories', authValidation, Category.getAll);

app.post('/post', authValidation, postValidation, Post.create);

app.get('/post', authValidation, Post.getAll);

app.get('/post/:id', authValidation, Post.getById);

app.put('/post/:id', authValidation, postEditValidation, Post.update);

app.delete('/post/:id', authValidation, postDeleteValidation, Post.erase);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

const express = require('express');
const User = require('./controllers/user');
const Category = require('./controllers/category');
const loginValidation = require('./middlewares/loginValidation');
const userValidation = require('./middlewares/userValidation');
const authValidation = require('./middlewares/authValidation');
const categoryValidation = require('./middlewares/categoryValidation');

// ...

const app = express();

app.use(express.json());

app.post('/login', loginValidation, User.login);

app.post('/user', userValidation, User.create);

app.get('/user', authValidation, User.getAll);

app.get('/user/:id', authValidation, User.getById);

app.post('/categories', authValidation, categoryValidation, Category.create);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

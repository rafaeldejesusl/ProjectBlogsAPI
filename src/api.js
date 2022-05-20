const express = require('express');
const User = require('./controllers/user');
const loginValidation = require('./middlewares/loginValidation');
const userValidation = require('./middlewares/userValidation');
const authValidation = require('./middlewares/authValidation');

// ...

const app = express();

app.use(express.json());

app.post('/login', loginValidation, User.login);

app.post('/user', userValidation, User.create);

app.get('/user', authValidation, User.getAll);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

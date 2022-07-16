const express = require('express');

require('express-async-errors');

const login = require('./routes/loginRoute');
const error = require('./middlewares/erroMiddleware');

const app = express();

app.use(express.json());

app.use('/login', login);

app.use(error);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
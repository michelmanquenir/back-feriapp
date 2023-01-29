const express = require('express');
const app = express();
const cors = require('cors');
const moment = require('moment');

//setting
app.set('port', process.env.PORT || 5001);

// middlewares
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/productos', require('./routes/productos'));

module.exports = app;
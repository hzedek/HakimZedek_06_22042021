const express = require('express');
const app = express();
require('./dbConfig');
const bodyParser = require('body-parser');

const userRoutes=require('./routes/user');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.post('/api/user', (req, res, next) => {

  });

app.use('/api/auth', userRoutes);

module.exports = app;
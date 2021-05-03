const express = require('express');
const app = express();
require('./dbConfig');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes=require('./routes/user');
const sauceRoutes= require('./routes/sauces');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.post('/api', sauceRoutes);
app.use('/api', sauceRoutes);

module.exports = app;
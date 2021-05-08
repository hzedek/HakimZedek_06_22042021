const express = require('express');
const app = express();
require('./dbConfig');
const path = require('path');
const helmet = require("helmet");
const bodyParser = require("body-parser");

const userRoutes=require('./routes/user');
const sauceRoutes= require('./routes/sauces');



app.use(helmet());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);

app.post('/api', sauceRoutes);
app.use('/api', sauceRoutes);
app.put('/api', sauceRoutes);
app.delete('/api', sauceRoutes);

module.exports = app;
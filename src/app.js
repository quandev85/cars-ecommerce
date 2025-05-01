require('dotenv').config();
const express = require('express');
const app = express();

const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

// middleware
app.use(morgan('dev'));
app.use(compression());
app.use(helmet());
app.use(express.json());

// routes
app.use('/api', require('./routes'));

// init mongo
require('./db/init.mongo');

module.exports = app;

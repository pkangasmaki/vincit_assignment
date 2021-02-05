const express = require('express');
const stockRouter = require('./routes/stocks');

const app = express();

app.use('/api/stocks', stockRouter);

module.exports = app;
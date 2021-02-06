const express = require('express');
const stockRouter = require('./routes/stocks');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/api/stocks', stockRouter);

module.exports = app;
const express = require('express');

const router = express.Router();
const stockService = require('../services/stockService');

router.get('/', (req, res) => {
  res.send(stockService.getStocks());
});

module.exports = router;
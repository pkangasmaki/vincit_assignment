const express = require('express');

const router = express.Router();
const stockService = require('../services/stockService');

//Sends all stocks
router.get('/', (req, res) => {
  res.send(stockService.getStocks());
});

//Sends stocks in range of dates
//  /api/stocks/range?startDate=01/12/2020&endDate=01/20/2021
router.get('/range', (req, res) => {
  const start = Date.parse(req.query.startDate);
  const end = Date.parse(req.query.endDate);

  if(!start) return res.send({ err: 'startDate query param missing' });
  if(!end) return res.send({ err: 'endDate query param missing' });

  res.send(stockService.getDateRange(start, end));
});

//Sends latest stock data
router.get('/latest', (req, res) => {
  res.send(stockService.getLatest());
});

module.exports = router;
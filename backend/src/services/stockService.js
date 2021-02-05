const csv = require('csv-parser');
const fs = require('fs');
const stockHelper = require('../utils/stock_helper');

const dataPath = '../../../data/HistoricalQuotes.csv';
const stockData = [];

//Read data from csv file and push it to the stockData array
fs.createReadStream(__dirname + dataPath)
  .pipe(csv())
  .on('data', (row) => {
    stockData.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

//Get all the stocks from data
const getStocks = () => {
  //Pass and error if fetching data fails or returns empty
  if(stockData.length === 0) return { err: 'Error fetching data' };
  return stockData;
};

//Get stocks from the range parameters
const getDateRange = (startDate, endDate) => {
  const getMultipleDays = stockHelper.getDates(stockData, startDate, endDate);
  return getMultipleDays;
};

//Get single stock of the day
const getDate = (date) => {
  const getOneDay = stockHelper.getDate(stockData, date);
  return getOneDay;
};

//Get latest stock
const getLatest = () => {
  const getOneDay = stockHelper.getDate(stockData, stockData[0].Date);
  return getOneDay;
};

module.exports = {
  getStocks, getDateRange, getDate, getLatest
};
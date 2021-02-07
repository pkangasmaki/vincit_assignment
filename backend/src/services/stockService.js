/* eslint-disable quotes */
const csv = require('csv-parser');
const fs = require('fs');
const stockHelper = require('../utils/stock_helper');

const dataPath = '../../../data/HistoricalQuotes.csv';
let stockData = [];

//Read data from csv file and push it to the stockData array
fs.createReadStream(__dirname + dataPath)
  .pipe(csv())
  .on('data', (row) => {
    //Adding own fields: YesterdayClose, SMA5, PriceChange to the objects.
    let obj = {
      Date: row.Date,
      Close: stockHelper.toNum(row[" Close/Last"]),
      Volume: Number(row[" Volume"].substring(1)),
      Open: stockHelper.toNum(row[" Open"]),
      High: stockHelper.toNum(row[" High"]),
      Low: stockHelper.toNum(row[" Low"]),
      PriceChange: stockHelper.priceChange(row[" High"], row[" Low"]),
    };
    stockData.push(obj);
  })
  .on('end', () => {
    stockData = stockHelper.addPreviousClose(stockData);
    stockData = stockHelper.addSMA5(stockData);
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
  //console.log(stockData);
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
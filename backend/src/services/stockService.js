/* eslint-disable quotes */
const csv = require('csv-parser');
const fs = require('fs');
const stockHelper = require('../utils/stock_helper');

const dataPath = '../../../data/HistoricalQuotes.csv';
const stockData = [];

//Function to remove first 2 letters (Database has space + $ at the start of each price value) and turn it to number for calculations
const toNum = (value) => {
  return Number(value.substring(2));
};

//Returns the difference between params high and low, always positive
const priceChange = (high, low) => {
  if(toNum(high) > toNum(low)) return toNum(high)-toNum(low);
  else return toNum(low)-toNum(high);
};

//Add previous close price to the stockData array values
const addPreviousClose = () => {
  let i = 0;
  for(i = 0; i < stockData.length; i++) {
    //Except for the latest day since it does not have previous day
    if(i !== stockData.length-1) {
      stockData[i].PreviousClose = stockData[i+1].Close;
    }
  }
};

//Add SMA5 to stockData array values
const addSMA5 = () => {
  let j = 0;
  for(j = 0; j < stockData.length; j++) {
    if(j < stockData.length-5) {
      sma5calc(j);
    }
  }
};

//Calculate SMA5
const sma5calc = (index) => {
  let sma5Value = 0;
  let i;
  for(i = 1; i<6; i++) {
    sma5Value += stockData[index+i].Close;
  }
  stockData[index].SMA5 = sma5Value/5;
};

//Read data from csv file and push it to the stockData array
fs.createReadStream(__dirname + dataPath)
  .pipe(csv())
  .on('data', (row) => {
    //Adding own fields: YesterdayClose, SMA5, PriceChange to the objects.
    let obj = {
      Date: row.Date,
      Close: toNum(row[" Close/Last"]),
      Volume: Number(row[" Volume"].substring(1)),
      Open: toNum(row[" Open"]),
      High: toNum(row[" High"]),
      Low: toNum(row[" Low"]),
      PriceChange: priceChange(row[" High"], row[" Low"]),
    };
    stockData.push(obj);
  })
  .on('end', () => {
    addPreviousClose();
    addSMA5();
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
//Filters and returns single day given as parameter
const getDate = (data, date) => {
  return data.filter(e => e.Date === date);
};

//Filters and returns all the dates between the parameters
const getDates = (data, startDate, endDate) => {
  return data.filter(e => {
    const date = Date.parse(e.Date);
    return date >= startDate && date <= endDate;
  });
};

//Function to remove first 2 letters (Database has space + $ at the start of each price value) and turn it to number for calculations
const toNum = (value) => {
  return Number(value.substring(2));
};

//Returns the difference between params high and low, always positive
const priceChange = (high, low) => {
  if(toNum(high) > toNum(low)) return toNum(high)-toNum(low);
  else return toNum(low)-toNum(high);
};

//Go through each element and run them through sma5 calculator
const addSMA5 = (data) => {
  let j = 0;
  for(j = 0; j < data.length; j++) {
    if(j < data.length-5) {
      sma5calc(data ,j);
    }
  }
  return data;
};

//Calculate SMA5's and add them to each element
const sma5calc = (data, index) => {
  let sma5Value = 0;
  let i;
  for(i = 1; i<6; i++) {
    sma5Value += data[index+i].Close;
  }
  data[index].SMA5 = sma5Value/5;
};

//Add previous close price to the stockData array values
const addPreviousClose = (data) => {
  let i = 0;
  for(i = 0; i < data.length; i++) {
    //Except for the latest day since it does not have previous day
    if(i !== data.length-1) {
      data[i].PreviousClose = data[i+1].Close;
    }
  }
  return data;
};

module.exports = {
  getDate, getDates, toNum, priceChange, addSMA5, addPreviousClose
};
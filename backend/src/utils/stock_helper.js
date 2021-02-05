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

module.exports = {
  getDate, getDates
};
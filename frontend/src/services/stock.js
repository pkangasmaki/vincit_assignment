import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/stocks'

///api/stocks/range?startDate=01/12/2020&endDate=01/20/2021
const getRange = async (start, end) => {
  const stockData = await axios.get(`${baseUrl}/range?startDate=${start}&endDate=${end}`)
  return stockData.data
}

export default { getRange }
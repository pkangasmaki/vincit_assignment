import React from 'react'

const SMA5List = ({ stock }) => {
  //Do not display anything if stock is not defined
  if (!stock) {
    return null
  }

  const smaPercentage = (open, SMA5) => {
    return (open/SMA5).toFixed(4)
  }

  return (
    <tr>
      <td>{stock.Date}</td>
      <td>{smaPercentage(stock.Open, stock.SMA5)}%</td>
    </tr>
  )
}

export default SMA5List


import React from 'react'

const Stock = ({ stock }) => {
  //Do not display anything if stock is not defined
  if (!stock) {
    return null
  }

  return (
    <tr>
      <td>{stock.Date}</td>
      <td>{stock.Volume}</td>
      <td>{stock.PriceChange.toFixed(4)}$</td>
    </tr>
  )
}

export default Stock

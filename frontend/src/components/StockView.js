/* eslint-disable quotes */
import React from 'react'

const StockView = ({ stocks, dateRange }) => {

  //Display instructions if stocks haven't been defined yet
  if (stocks.length === 0) {
    return (
      <div>
        Start by giving a date range!
      </div>
    )
  }

  return (
    <div>
      Showing stocks {dateRange}
      {stocks.map(stock => <p key={stock.Date}>{stock.Date} - {stock[" Close/Last"]}</p>)}
    </div>
  )
}

export default StockView

import React from 'react'
import VolumeList from './VolumeList'
import SMA5List from './SMA5List'
import Table from 'react-bootstrap/Table'

const StockView = ({ showList, stocks, dateRange }) => {

  //Display instructions if stocks haven't been defined yet
  if (stocks.length === 0) {
    return (
      <div>
        Start by giving a date range!
      </div>
    )
  }

  //Sort array by elements value volume in descending order
  const sortByVolume = (array) => {
    return array.sort((a, b) => (a.Volume < b.Volume) ? 1 : (a.Volume === b.volume) ? ((a.PriceChange < b.PriceChange) ? 1 : -1) : -1 )
  }

  //Sort array by elemets SMA5 percentage in descending order
  const sortBySMA5 = (array) => {
    return array.sort((a, b) => {
      return (a.Open/a.SMA5 < b.Open/b.SMA5) ? 1 : -1
    })
  }

  ////Sort array by elements date in ascending order
  const sortByDate = (array) => {
    return array.sort((a, b) => {
      return (a.Date > b.Date) ? 1 : -1
    })
  }

  const calculateStreak = (array) => {
    if(array.length === 0) return 0

    let streakCalc= 1
    let highestStreak= 0

    //Sort array by date so they're in correct order
    sortByDate(array).forEach(stock => {
      if(stock.Close > stock.PreviousClose) {
        streakCalc = streakCalc + 1
        if (streakCalc > highestStreak) {
          highestStreak = streakCalc
        }
      } else {
        streakCalc = 1
      }
    })

    return highestStreak
  }

  return (
    <div style={{ marginTop: 10 }}>
      <p>
        In Apple stock historical data the Close/Last price increased <b>{calculateStreak(stocks.reverse())}</b> days in a row between {dateRange.start} and {dateRange.end}
      </p>
      <h4>{showList}</h4>

      {showList==='Volume' &&
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Date</td>
            <td>Volume</td>
            <td>Price change</td>
          </tr>
        </thead>
        <tbody>
          {sortByVolume(stocks).map(stock =>
            <VolumeList
              key={stock.Date}
              stock={stock}
            />
          )}
        </tbody>
      </Table>}

      {showList==='SMA5' &&
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Date</td>
            <td>Price change %</td>
          </tr>
        </thead>
        <tbody>
          {sortBySMA5(stocks).map(stock =>
            <SMA5List
              key={stock.Date}
              stock={stock}
            />
          )}
        </tbody>
      </Table>}
    </div>
  )
}

export default StockView

import React, { useState } from 'react'
import './App.css'

import DateForm from './components/DateForm'
import Notification from './components/Notification'
import StockView from './components/StockView'

const App = () => {

  const [notificationMsg, setNotificationMsg] = useState('')
  const [stocks, setStocks] = useState([])
  const [dateRange, setDateRange] = useState('')

  return (
    <div>
      <div>
        <Notification notificationMsg={notificationMsg}/>
        <h3>Insert date range</h3>
        <DateForm setDateRange={setDateRange} setStocks={setStocks} setNotificationMsg={setNotificationMsg} />
      </div>
      <StockView dateRange={dateRange} stocks={stocks} />
    </div>
  )
}

export default App

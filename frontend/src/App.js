import React, { useState } from 'react'

import DateForm from './components/DateForm'
import Notification from './components/Notification'
import StockView from './components/StockView'

const App = () => {

  const [notificationMsg, setNotificationMsg] = useState('')
  const [stocks, setStocks] = useState([])
  const [dateRange, setDateRange] = useState({})
  const [showList, setShowList] = useState('')

  return (
    <div style={{ marginLeft:'25%', marginRight:'25%' }}>
      <Notification notificationMsg={notificationMsg}/>
      <div>
        <h3>Insert date range</h3>
        <DateForm setShowList={setShowList} setDateRange={setDateRange} setStocks={setStocks} setNotificationMsg={setNotificationMsg} />
      </div>
      <StockView showList={showList} dateRange={dateRange} stocks={stocks} />
    </div>
  )
}

export default App

import React, { useState } from 'react'

import DateForm from './components/DateForm'
import Notification from './components/Notification'

const App = () => {

  const [notificationMsg, setNotificationMsg] = useState('')

  return (
    <div>
      <Notification notificationMsg={notificationMsg}/>
      <h3>Insert date range</h3>
      <DateForm setNotificationMsg={setNotificationMsg} />
    </div>
  )
}

export default App

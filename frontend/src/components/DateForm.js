import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import stockService from '../services/stock'

const DateForm = ({ setShowList, setDateRange, setStocks, setNotificationMsg }) => {

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleStartDate = (e) => setStartDate(e.target.value)
  const handleEndDate = (e) => setEndDate(e.target.value)

  //Transform months (for example: Jan) into numeral form
  const monthToNum = (month) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    let numeralMonth = months.indexOf(month)+1

    //Turn values such as 1 to 01 etc.
    if(numeralMonth < 10) numeralMonth = '0'+ numeralMonth
    return numeralMonth
  }

  //Transform date from dd-mm-yy to mm/dd/yyyy
  const transformDate = (date) => {

    const dateObj = new Date(date).toString()
    const splitDate = dateObj.split(' ')

    const dd = splitDate[2]
    const mm = monthToNum(splitDate[1])
    const yyyy = splitDate[3]

    const modifiedDate = mm+'/'+dd+'/'+yyyy
    return modifiedDate
  }

  const handleClick = async (e) => {
    e.preventDefault()
    //Pass notification if values are missing from input fields
    if(!startDate) {
      setNotificationMsg('Start date missing')
      return setTimeout(() => setNotificationMsg(''), 3000)
    }

    if(!endDate) {
      setNotificationMsg('End date missing')
      return setTimeout(() => setNotificationMsg(''), 3000)
    }

    setDateRange({ start: transformDate(startDate), end: transformDate(endDate) })
    console.log(transformDate(startDate), ' to ', transformDate(endDate))

    //Fetch data from backend in the given range
    const data = await stockService.getRange(transformDate(startDate), transformDate(endDate))
    setStocks(data)
    setShowList(e.target.value)
  }

  const handleClear = (e) => {
    e.preventDefault()
    setShowList('')
    setDateRange({})
    setStocks([])
    setStartDate('')
    setEndDate('')
  }

  return (
    <Form>
      Start date <Form.Control type="date" value={startDate} onChange={handleStartDate} />
      End date <Form.Control type="date" value={endDate} onChange={handleEndDate} />
      <Button style={{ marginTop: 10 }} variant="primary" type="submit" onClick={handleClick} value="Volume"> Volume </Button>
      <Button style={{ marginTop: 10, marginLeft: 10 }} variant="primary" onClick={handleClick} value="SMA5"> SMA5 </Button>
      <Button style={{ marginTop: 10, color:'red' }} variant="sm link" onClick={handleClear} value="SMA5"> Clear </Button>
    </Form>
  )
}

export default DateForm

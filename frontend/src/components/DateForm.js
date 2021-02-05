import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
//import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import stockService from '../services/stock'

const DateForm = ({ setDateRange, setStocks, setNotificationMsg }) => {

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleStartDate = (e) => setStartDate(e.target.value)
  const handleEndDate = (e) => setEndDate(e.target.value)

  //Transform date from dd-mm-yy to mm/dd/yyyy
  const transformDate = (date) => {
    const splitDate = date.split('-')

    const dd = splitDate[2]
    const mm = splitDate[1]
    const yyyy = splitDate[0]

    const modifiedDate = mm+'/'+dd+'/'+yyyy
    return modifiedDate
  }

  const handleSubmit = async (e) => {
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

    console.log('start:', transformDate(startDate))
    console.log('end:', transformDate(endDate))
    setDateRange(' from ' + transformDate(startDate)+ ' to ' + transformDate(endDate))
    const data = await stockService.getRange(transformDate(startDate), transformDate(endDate))
    setStocks(data)
    console.log(data)

    //Clear the input-values
    setStartDate('')
    setEndDate('')
  }

  return (
    <Form onSubmit={handleSubmit}>

          Start date
      <Form.Control type="date" value={startDate} onChange={handleStartDate} />

          End date
      <Form.Control type="date" value={endDate} onChange={handleEndDate} />
      <Button style={{ marginTop: 10 }} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default DateForm

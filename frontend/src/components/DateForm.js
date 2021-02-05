import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const DateForm = ({ setNotificationMsg }) => {

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleStartDate = (e) => setStartDate(e.target.value)
  const handleEndDate = (e) => setEndDate(e.target.value)

  const handleSubmit = (e) => {
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

    console.log('start:', startDate)
    console.log('end:', endDate)

    //Clear the input-values
    setStartDate('')
    setEndDate('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Col>
          Start date
          <Form.Control type="date" value={startDate} onChange={handleStartDate} />
        </Col>
        <Col>
          End date
          <Form.Control type="date" value={endDate} onChange={handleEndDate} />
        </Col>
      </Form.Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default DateForm

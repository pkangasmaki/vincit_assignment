import React from 'react'
import Alert from 'react-bootstrap/Alert'

const Notification = ({ notificationMsg }) => {
  //Do not display notification if the message is not defined
  if (!notificationMsg) {
    return null
  }

  return (
    <>
      <Alert variant='danger'>
        {notificationMsg}
      </Alert>
    </>
  )
}

export default Notification

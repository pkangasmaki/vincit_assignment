import React from 'react'

const Notification = ({ notificationMsg }) => {

  //Do not display notification if the message is not defined
  if (!notificationMsg) {
    return null
  }

  return (
    <div>
      {notificationMsg}
    </div>
  )
}

export default Notification

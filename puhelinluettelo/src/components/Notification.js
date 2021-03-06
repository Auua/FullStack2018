import React from 'react'
import './Notification.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="done">
      {message}
    </div>
  )
}

export default Notification
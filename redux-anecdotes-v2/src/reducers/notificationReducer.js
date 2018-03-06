
const notificationReducer = (state = null, action) => {
  if (action.type === 'NOTIFICATION'){
    return state = action.notification
  }
  return state
}

export const notificationChange = (notification) => {
  return {
    type: 'NOTIFICATION',
    notification
  }
}

export default notificationReducer

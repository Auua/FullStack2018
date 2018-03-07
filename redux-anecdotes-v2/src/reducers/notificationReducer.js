
const notificationReducer = (state = null, action) => {
  if (action.type === 'NOTIFICATION'){
    return action.content
  }
  return state
}

export const notificationChange = (notification) => {
  return {
    type: 'NOTIFICATION',
    notification
  }
}

export const notify = ( content, time ) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        content: null
      })
    }, time * 100 )
    dispatch({
      type: 'NOTIFICATION',
      content
    })
  }
}

export default notificationReducer

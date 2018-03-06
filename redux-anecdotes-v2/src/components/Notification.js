import React from 'react'
//import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    if (this.props.store.getState().notifications) {
      return (
        <div style={style}>
          {this.props.store.getState().notifications}
        </div>
      )
    }
    return (
      <div></div>
    )
  }
}

export default Notification

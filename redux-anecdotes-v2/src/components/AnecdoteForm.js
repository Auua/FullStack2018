import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.anecdoteCreation(content)
    const message = `You created ${content}`
    this.props.notificationChange(message)
    e.target.anecdote.value = ''
    setTimeout(() => {
      this.props.notificationChange(message)
    }, 5000)
  }


  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  anecdoteCreation,
  notificationChange
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

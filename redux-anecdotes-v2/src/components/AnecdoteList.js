import React from 'react'
//import { connect } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'


class AnecdoteList extends React.Component {

  voteAnecdote = (anecdote) => () => {
    this.props.store.dispatch(likeAnecdote(anecdote.id))
    const message = `You voted ${anecdote.content}`
    this.props.store.dispatch(notificationChange(message))
    setTimeout(() => {
      this.props.store.dispatch(notificationChange(null))
    }, 5000)
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList

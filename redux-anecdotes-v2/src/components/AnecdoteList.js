import React from 'react'
import { connect } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

import Anecdote from './Anecdote'

const AnecdoteList = (props) => {
  const voteAnecdote = async (anecdote) => {
    props.likeAnecdote(anecdote)
    const message = `You voted ${anecdote.content}`
    props.notify(message, 50)
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => voteAnecdote(anecdote)}
        />
      )}
    </div>
  )
}

const anecdotesToShow = (filter, anecdotes) => {
  return anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().replace(/\s/g, '').includes(filter.toLowerCase().replace(/\s/g, '')))
}

const mapDispatchToProps = {
  likeAnecdote,
  notify
}


const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.filter, state.anecdotes)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
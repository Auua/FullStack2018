import React, { Component} from 'react'

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

class App extends Component {
  

  vote = (id) => () =>{
    this.props.store.dispatch({ 
      type: 'VOTE',
      data: {
        id: id
      }
    })
  }

  create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    
    this.props.store.dispatch({ 
      type: 'CREATE',
      data: {
        content: content,
        id: generateId(),
        votes: 0
      }
    })
    event.target.anecdote.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()

    anecdotes.sort((a,b) => 
      b.votes - a.votes
    )

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.create}>
          <div><input name='anecdote'/></div>
          <button type='submit'>create</button> 
        </form>
      </div>
    )
  }
}

export default App
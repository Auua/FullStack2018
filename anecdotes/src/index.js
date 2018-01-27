import React, { Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: new Array(this.props.anecdotes.length).fill(0)
    }
    this.next = this.next.bind(this)
    this.vote = this.vote.bind(this)
  }



  next = (e) => {
    const random = Math.floor(Math.random() * e.target.value)
    this.setState({
      selected: random
    })
  }

  vote = () => {
    const newVote = this.state.votes
    newVote[this.state.selected] = newVote[this.state.selected] + 1
    this.setState({
      votes: newVote
    })
  }

  render() {
    const anecdote = this.props.anecdotes[this.state.selected]
    const max = this.props.anecdotes.length
    const mostVotes = this.state.votes.indexOf(Math.max(...this.state.votes))

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdote}
        { this.state.votes[this.state.selected] ? 
          <p>has {this.state.votes[this.state.selected]} votes</p> 
          : <p>no votes yet</p> }
        <div>
          <button onClick={this.vote} >Vote</button>
          <button onClick={this.next} value={max} >Next anecdote</button>
        </div>
        <div>
          <h3>Anecdote with most votes</h3>
          {this.props.anecdotes[mostVotes]} <br/>
          has {this.state.votes[mostVotes]} votes
        </div>
      </div>
      
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
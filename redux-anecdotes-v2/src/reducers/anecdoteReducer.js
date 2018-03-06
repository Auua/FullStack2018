
const reducer = (store = [], action) => {
  switch(action.type) {
  case 'INIT':
    return action.data

  case 'VOTE':
    const old = store.filter(a => a.id !== action.data.id)
    const voted = store.find(a => a.id === action.data.id)
    return [...old, { ...voted , votes: voted.votes + 1 }]

  case 'CREATE':
    return [...store, action.data]

  default:
    return store
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const likeAnecdote = (data) => {
  return {
    type: 'VOTE',
    data
  }
}

export default reducer

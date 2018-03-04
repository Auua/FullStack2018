

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let good = state.good + 1
      return {... state, good: good}
    case 'OK':
      let ok = state.ok + 1
      return {... state, ok: ok}
    case 'BAD':
      let bad = state.bad + 1
      return {... state, bad: bad}
    case 'ZERO':
      let zero = { good: 0, ok: 0, bad: 0}
      return zero
  }
  return state
}

export default counterReducer
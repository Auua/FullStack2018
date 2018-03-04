import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'

const Statistiikka = () => {
  const palautteet = store.getState()

  const maara = palautteet.good + palautteet.bad + palautteet.ok

  if (maara === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  let ka = ((palautteet.good - palautteet.bad )/ maara * 100).toFixed(1)

  let pos = (palautteet.good / maara * 100).toFixed(1)

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{palautteet.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{palautteet.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{palautteet.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{ka}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{pos}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
    </div>
  )
}

class App extends React.Component {

  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
import React, { Component } from 'react'
import ReactDOM from 'react-dom'


const Palaute = ({ palaute, handleClick }) => {
  return (
    <div>
      <h1>Anna palautetta</h1>            
      {palaute.map((arvosana) => 
        <Button key={arvosana.nimi} nimi={arvosana.nimi} handleClick={handleClick}/>
      )}
    </div>
  )
}

const Button = (props) => (
  <button id={props.nimi} onClick={props.handleClick}>
    {props.nimi}
  </button>
)

const Statistiikka = ({ palaute, keskiarvo }) => {
  
  let total = 0
  palaute.map(arvosana => total += arvosana.maara)
  
  let ka = keskiarvo / total
  ka = ka.toFixed(2)

  let pos = palaute[0].maara / total * 100
  pos = pos.toFixed(1)

  if (!total) {
    return <div><h2>Statistiikka</h2> Ei vielä arvioita</div>
  }
  return (  
    <div>
    <h2>Statistiikka</h2>
    <table>
      <tbody>
      {palaute.map((arvosana) => 
        <tr key={arvosana.nimi}>
          <td>{arvosana.nimi}</td>
          <td>{arvosana.maara}</td>
        </tr>
      )}            
      <tr>
        <td>keskiarvo</td>
        <td>{ka}</td>
      </tr>
      <tr>
        <td>positiivisia </td>
        <td>{pos} %</td>
      </tr>
      </tbody>
    </table>
    </div>
  )
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      keskiarvo: 0,
    }
  }

  handleClick = (e) => {
    switch (e.target.id) {
      case 'hyvä':
        this.setState({ ...this.state, hyva: this.state.hyva + 1, keskiarvo: this.state.keskiarvo + 1 })
        break
      case 'neutraali':
        this.setState({ ...this.state, neutraali: this.state.neutraali + 1 })
        break
      case 'huono':
        this.setState({ ...this.state, huono: this.state.huono + 1 , keskiarvo: this.state.keskiarvo - 1 })
        break

      default:
        break
  }}

  render() {
    const palaute = [
      {
        nimi: 'hyvä',
        maara: this.state.hyva
      },
      {
        nimi: 'neutraali',
        maara: this.state.neutraali
      },
      {
        nimi: 'huono',
        maara: this.state.huono
      }
    ]

    return (
    <div>
      <Palaute palaute={palaute} handleClick={this.handleClick}/>
      <Statistiikka palaute={palaute} keskiarvo={this.state.keskiarvo}/>
    </div>
  )}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
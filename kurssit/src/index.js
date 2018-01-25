import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
  <div>
    <h1>{props.kurssi}</h1>
  </div>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      {props.osat.map((osa) =>
        <Osa key={osa.nimi} osa={osa}/>
      )}
    </div>
  )
}

const Osa = (props) => {
  const { nimi, tehtavia } = props.osa
  return(
    <div>
      <p>{nimi} tehtäviä: {tehtavia}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  const osat  = props.osat
  let yht = 0
  osat.map(osa => yht += osa.tehtavia)
  return (
    <div>
      <p>yhteensä {yht} tehtävää</p>
    </div>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat}/>
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
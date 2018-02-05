import React from 'react'

import Sisalto from './Sisalto'
import Yhteensa from './Yhteensa'


const Kurssi = ({ kurssi }) => {
  return (
  <div>
    <h1>{kurssi.nimi}</h1>
    <Sisalto osat={kurssi.osat}/>
    <Yhteensa osat={kurssi.osat} />
  </div>
  )
}

export default Kurssi

import React from 'react'


const Osa = ({ osa }) => {
  const { nimi, tehtavia } = osa
  return(
    <div>
      <p>{nimi} tehtäviä: {tehtavia}</p>
    </div>
  )
}

export default Osa
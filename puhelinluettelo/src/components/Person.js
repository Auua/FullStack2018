import React from 'react'

const Person = ({ person, poista }) => {
  return(
    <tbody>
      <tr>
        <td>{person.name}:</td>
        <td>{person.number}</td>
        <td><button id={person.id} name={person.name} onClick={poista}>poista</button></td>
      </tr>
    </tbody>
  )
}

export default Person
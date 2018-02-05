import React from 'react'

const Yhteensa = ({ osat }) => {

  let yht = osat.reduce( (sum, osa) => sum + osa.tehtavia, 0);
  //osat.map(osa => yht += osa.tehtavia)
  return (
    <div>
      <p>yhteensä {yht} tehtävää</p>
    </div>
  )
}

export default Yhteensa
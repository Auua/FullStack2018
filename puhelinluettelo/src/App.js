import React from 'react'

import Person from './components/Person'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filterName: ''
    }
    this.addName = this.addName.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.filterNames = this.filterNames.bind(this)
  }

  addName = (e) => {
    e.preventDefault()
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    if (this.state.persons.filter(person => person.name === newPerson.name).length === 0) {
      const persons = this.state.persons.concat(newPerson)
      this.setState({
        persons,
        newName: '',
        newNumber: ''
      })
    }
    
  } 

  handleNameChange = (e) => {
    this.setState({ newName: e.target.value })
  }
  handleNumberChange = (e) => {
    this.setState({ newNumber: e.target.value })
  }

  filterNames = (e) => {
    this.setState({ filterName: e.target.value })
  }

  render() {

    const persons = this.state.persons ? this.state.persons.filter((person) => {
      return person.name.toLowerCase().includes(this.state.filterName.toLowerCase())}): this.state.persons
    
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          Hae: <input value={this.state.filterName} onChange={this.filterNames}/>
        </div>
        <h3>Lisää uusi </h3>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input value={this.state.newName}  onChange={this.handleNameChange}/>
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {persons.map(person =>
          <Person key={person.name} person={person}/>
        )}
      </div>
    )
  }
}

export default App
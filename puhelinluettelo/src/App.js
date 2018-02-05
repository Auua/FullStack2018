import React, { Component } from 'react'

import Person from './components/Person'
import PersonService from './services/Persons'
import Notification from './components/Notification'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filterName: '',
      message: null
    }
    this.addName = this.addName.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.filterNames = this.filterNames.bind(this)
    this.deleteName = this.deleteName.bind(this)
  }

  componentWillMount() {
    PersonService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  addName = (e) => {
    e.preventDefault()
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const checkNames = this.state.persons.filter(person => person.name === newPerson.name)

    if (checkNames.length === 0) {
      
      PersonService
        .create(newPerson)
        .then(response => {
          this.setState({
            message: 'Uusi yhteystieto lisätty!',
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNumber: ''
          })
        })
    } else if (checkNames.length === 1) {
      if (window.confirm('Vaihdetaanko yhteystiedot: ' + checkNames[0].name)) {
        console.log(checkNames[0].id)
        PersonService
        .update(checkNames[0].id, newPerson)
        .then(
          this.state.persons.splice(this.state.persons.findIndex(p => p.name === newPerson.name), 1, newPerson),
          this.setState({
            message: newPerson.name + ' vaihdettu',
            persons: this.state.persons,
            newName: '',
            newNumber: ''
          })
        )
      }
    }
    setTimeout(() => {
      this.setState({message: null})
    }, 3000)
  }
  
  deleteName = (e) => {
    if (window.confirm("Poistetaanko " + e.target.name)) {
      PersonService
      .deleteName(e.target.id)
      .then(
        this.state.persons.splice(this.state.persons.findIndex(p => p.id === e.target.id), 1),
        this.setState({ 
          message: e.target.name + ' poistettu',
          persons: this.state.persons}),
        setTimeout(() => {
          this.setState({message: null})
        }, 3000)
      )
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

        <Notification message={this.state.message}/>

        <div>
          Hae: <input value={this.state.filterName} onChange={this.filterNames}/>
        </div>
        <h3>Lisää uusi </h3>
        <form onSubmit={this.addName}>
          <div>
            Nimi: <input value={this.state.newName}  onChange={this.handleNameChange}/>
          </div>
          <div>
            Numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
          {persons.map(person =>
            <Person key={person.name} poista={this.deleteName} person={person}/> 
          )}
        </table>
      </div>
    )
  }
}

export default App
import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filterName: ''
    }
    this.filterNames = this.filterNames.bind(this)
    this.getInfo = this.getInfo.bind(this)
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const countries= response.data
        this.setState({
          countries
        })
    })
  }

  getInfo = (e) => {
    this.setState({ filterName: e.target.id })
  }

  filterNames = (e) => {
    this.setState({ filterName: e.target.value })
  }

  render() {

    let countries= <div>Too many maches, be more specific</div>

    const filtered = this.state.countries.filter((country) => {
      return country.name.toLowerCase().includes(this.state.filterName.toLowerCase())})

    if (filtered.length < 10) {
      countries = 
        <ul>
          {filtered.map(country =>
            <li key={country.name} id={country.name} onClick={this.getInfo}>{country.name}</li>
          )}
        </ul> 
    } 
    if (filtered.length === 1) {
      countries = 
        <div>
          <h2>{filtered[0].name}</h2>
          Capital: {filtered[0].capital}<br/>
          Population: {filtered[0].population}<br/>
          <img  src={filtered[0].flag} alt="flag"/>
        </div>
      
    }

    
    return (
      <div>
        <h2>Countries</h2>
        <div>
          Find countries: <input value={this.state.filterName} onChange={this.filterNames}/>
        </div>

        <hr/>
        {countries}
        
      </div>
    );
  }
}

export default App;

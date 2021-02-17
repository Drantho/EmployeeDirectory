import React, { Component } from 'react'
import API from "./utils/API"

export default class App extends Component {
  state = {
    employees: []
  };

  getEmployees = () => {
    API.list().then(results => {
      console.log(results.data.results);
      this.setState({
        employees: results.data.results
      })
    })
  }

  componentDidMount = () => {
    this.getEmployees();
  }

  render() {
    return (
      <div>
        <ul>
        {this.state.employees.map(employee => <li key={employee.cell}>{employee.name.title} {employee.name.first} {employee.name.last}</li>)}
        </ul>
      </div>
    )
  }
}

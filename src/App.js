import React, { Component } from 'react'
import API from "./utils/API"
import Row from "./components/Row"
import "./style.css";

export default class App extends Component {
  state = {
    employees: [],
    filteredEmployees: [],
    sortBy: "",
    search: ""
  };

  getEmployees = () => {
    API.list().then(results => {
      console.log(results.data.results);
      this.setState({
        employees: results.data.results,
        filteredEmployees: results.data.results
      })
    })
  }

  componentDidMount = () => {
    this.getEmployees();
  }

  sortByProp = property => {
    let sortedEmployees = this.state.employees;
    sortedEmployees.sort((a,b) => {
      if(a.name[property] < b.name[property]){
        return -1
      } else if(a.name[property] > b.name[property]){
        return 1
      } else{
        return 0
      }
    });
    this.setState({
      filteredEmployees: sortedEmployees,
      sortBy: property
    })
  }

  handleInputChange = event => {
    let filtered = this.state.employees.filter(employee => {
      return employee.name.first.toLowerCase().includes(event.target.value.toLowerCase()) ||
      employee.name.last.toLowerCase().includes(event.target.value.toLowerCase()) ||
      employee.email.toLowerCase().includes(event.target.value.toLowerCase());
    });
    this.setState({
      search: event.target.value,
      filteredEmployees: filtered
    });
    
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Employee Directory</h1>
        <div>
          <input name="search" onChange={this.handleInputChange} value={this.state.search}/>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Portrait</th>
              <th>Title</th>
              <th className="link" onClick={() => {this.sortByProp("first")}}>Fist Name</th>
              <th className="link" onClick={() => {this.sortByProp("last")}}>Last Name</th>
              <th>Email</th>
              <th>Cell</th>
            </tr>
          </thead>
          <tbody>
          {this.state.filteredEmployees.map(employee => <Row key={employee.cell} employee={employee}></Row>)}
          </tbody>          
        </table>
      </div>
    )
  }
}

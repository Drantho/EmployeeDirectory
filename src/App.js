import React, { Component } from 'react'
import API from "./utils/API"
import Row from "./components/Row"
import "./style.css";

export default class App extends Component {
  state = {
    employees: [],
    filteredEmployees: [],
    sortBy: "",
    search: "",
    flip: {
      first: -1,
      last: 1
    }
  };

  getEmployees = () => {
    API.list().then(results => {
      console.log(results.data.results);
      this.setState({
        employees: results.data.results,
        filteredEmployees: results.data.results
      });
      this.sortByProp("last");
    })
  }

  componentDidMount = () => {
    this.getEmployees();
  }

  sortByProp = property => {
    let sortedEmployees = this.state.filteredEmployees;
    sortedEmployees.sort((a,b) => {
      if(a.name[property] < b.name[property]){
        return -1 * this.state.flip[property]
      } else if(a.name[property] > b.name[property]){
        return 1 * this.state.flip[property]
      } else{
        return 0
      }
    });
    const flip = this.state.flip;
    flip[property] = flip[property] * -1;
    this.setState({
      filteredEmployees: sortedEmployees,
      sortBy: property,
      flip: flip
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
        <div className="row">
        <div className=" col-sm-6 offset-sm-3">
          <i id="searchIcon" className="fas fa-search"></i>
          <input name="search" onChange={this.handleInputChange} value={this.state.search} className="form-control" placeholder="search by first, last, or email"/>
        </div>
        </div>        
        <table className="table">
          <thead>
            <tr>
              <th>Portrait</th>
              <th>Title</th>
              <th className="link" onClick={() => {this.sortByProp("first")}}>First&nbsp;Name&nbsp;{this.state.flip.first < 0?(<i className="fas fa-sort-down"></i>):(<i className="fas fa-sort-up"></i>)}</th>
              <th className="link" onClick={() => {this.sortByProp("last")}}>Last&nbsp;Name&nbsp;{this.state.flip.last < 0?(<i className="fas fa-sort-down"></i>):(<i className="fas fa-sort-up"></i>)}</th>
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

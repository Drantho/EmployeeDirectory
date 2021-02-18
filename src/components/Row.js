import React from 'react'

export default function Row(props) {
    return (
        <tr>
            <td><img src={props.employee.picture.thumbnail}/></td>
            <td>{props.employee.name.title}</td>
            <td>{props.employee.name.first}</td>
            <td>{props.employee.name.last}</td>
            <td><a href="mailto:{{props.employee.email}}"><i className="fas fa-envelope"></i> {props.employee.email}</a></td>
            <td><a href="tel:{props.employee.cell}"><i className="fas fa-phone"></i> {props.employee.cell}</a></td>            
        </tr>
    )
}

import React from 'react'

export default function Row(props) {
    return (
        <tr>
            <td><img src={props.employee.picture.thumbnail}/></td>
            <td>{props.employee.name.title}</td>
            <td>{props.employee.name.first}</td>
            <td>{props.employee.name.last}</td>
            <td>{props.employee.email}</td>
            <td>{props.employee.cell}</td>            
        </tr>
    )
}

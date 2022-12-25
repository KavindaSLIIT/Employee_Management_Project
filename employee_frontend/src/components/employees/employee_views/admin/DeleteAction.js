import React from 'react';
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";
import axios from 'axios';

const EmployeeDelete = (props) => {
   
    const employee = props.employee;

    // Function for delete employee
    const deleteEmployee = () => {
        Swal.fire({
            title: 'Are you want to delete employee',
            text: "Note that ths process can not be revert.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete'
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete(`http://localhost:8092/api/DeleteEmployee/${employee._id}`)
                    .then(res => {
                        Swal.fire(
                            'Done!',
                            'Employee deleted successfully!',
                            'success'
                        )
                        props.updateContent();
                    }).catch(err => {
                        console.log(err)
                    })
            }
        })
    }

  const restore= () => {
        Swal.fire({
            title: 'Are you want to restore employee',
            text: "Note that ths process can not be revert.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Restore'
        }).then((result) => {

            if (result.isConfirmed) {
                axios.put(`http://localhost:8092/api/restore/${employee._id}`)
                    .then(res => {
                        Swal.fire(
                            'Done!',
                            'restore deleted successfully!',
                            'success'
                        )
                        props.updateContent();
                        
                    }).catch(err => {
                        console.log(err)
                    })
            }
        })
    }


  

    return (<React.Fragment>
        <tr>
            <th scope="row">{employee.empNumber}</th>
            <td>{employee.name}</td>
            <td>{employee.empType}</td>
            <td>{employee.phoneNo}</td>
            <td>{employee.Address}</td>
            <td>{employee.joindate}</td>
            <td>{employee.ivalutionDate}</td>
            {
                !props.isGen ? <td>
                    <button onClick={restore} type="button" class="btn btn-success m-">restore</button>
                    <button onClick={deleteEmployee} type="button" class="btn btn-danger m-1">Delete</button>
                </td> : <React.Fragment />
            }
        </tr>
    
    </React.Fragment>);
}

export default EmployeeDelete;
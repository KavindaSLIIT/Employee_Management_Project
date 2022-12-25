import React from 'react'
import { useHistory } from "react-router-dom";
import {  FaStar } from 'react-icons/fa';

const PackageSmallView = (props) => {

    const employee = props.employee;
    const count = props.count;

    const history = useHistory();
    const handleClick = (path) => {
        history.push(path);
    }

    return (
        <div className={`col-xs-12 col-sm-6 col-md-${count}`}>
            
            <div class="card">
                <img src={employee.imageURL} class="card-img-top" alt={employee.empNumber} />
                <div class="card-body">
                    <h5 class="card-title text-center">{employee.name}</h5>
                    <h6 class="card-title">Emoployee ID: {employee.empNumber}</h6>
                    <p class="card-text">Emoployee JoinDate:{employee.joindate}</p>
                    <p class="card-text">Emoployee EndDate:{employee.joindate}</p>
                    <h4 class="card-text text-end text-danger mt-3 mb-3">Emoployee || {employee.empType}</h4>
                    <div class="card-footer">
                        <div class="row text-center">
                            <div className="">
                                <button onClick={() => handleClick(`/employee/${employee._id}`)} type="button" class="btn btn-outline-primary">View</button>
                                
                            </div>
                            
                        </div>
                        <FaStar />
                        <FaStar className='card-text text-end text-danger mt-3 mb-3'/>
                        <FaStar className='card-text text-end text-danger mt-3 mb-3'/>
                        <FaStar className='card-text text-end text-danger mt-3 mb-3'/>
                        <FaStar className='card-text text-end text-danger mt-3 mb-3'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PackageSmallView;



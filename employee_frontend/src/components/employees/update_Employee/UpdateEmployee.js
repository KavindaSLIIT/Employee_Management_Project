import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import axios from "axios"
import styled from 'styled-components';
import { Alert } from '../../../services/Alert';
import EmployeeValidations from '../../../validations/EmployeeValidations';
import dummy_image from "../../../assets/images/dummy_image.jpg"

class UpdateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image:null,
            filecv:null,
            id:"",
            name:"",
            empNumber:"",
            dateOfBirth:"",
            email:"",
            empType: "",
            phoneNo:"",
            Address:"",
            joindate:"",
            ivalutionDate:"",
            isUpdated: false,
            isfileUpdated: false
        }
    }

    // Update Categories by fetching from datasbase
    componentDidMount() {
        // request to get employee by id
        axios.get(`http://localhost:8092/api/${this.props.match.params.id}`).then(res => {
            let employee = res.data;

                this.setState({
                    id: employee._id,
                    image: {
                        preview:employee.imageURL,
                        raw:null,
                    },
                    fileme: {
                        preview:employee.filecv,
                        raw:null,
                    },
                    name:employee.name,
                    empNumber:employee.empNumber,
                    dateOfBirth:employee.dateOfBirth,
                    email:employee.email,
                    empType:employee.empType,
                    phoneNo:employee.phoneNo,
                    Address:employee.Address,
                    joindate:employee.joindate,
                    ivalutionDate:employee.ivalutionDate,
                    
                });
            }).catch(err => {
                console.log(err);
            });

       
    }


    // Handle input feild
    onInputValueChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

  
    // function to handle image
    handleChangeFile = (e) => {
        if (e.target.files.length) {
            const img = {
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            };
            this.setState({
                image: img,
                isUpdated: true
            });
        }
    };
    onSelectValueChange = (e) => {
        this.setState({[e.target.id]:e.target.value});
    }
//file handle
handlefileChangeFile = (e) => {
    if (e.target.files.length) {
        const myfile = {
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
        };
        this.setState({ fileme: myfile });
    }
};
    // Function for update employee
    submit = (e) => {



        e.preventDefault();

        console.log(this.state);

        const result =EmployeeValidations({
            name:this.state.name,
             empNumber:this.state.empNumber,
             dateOfBirth:this.state.dateOfBirth,
             email:this.state.email,
             empType:this.state.empType,
            phoneNo:this.state.phoneNo,
             Address:this.state.Address,
            joindate:this.state.joindate,
             ivalutionDate:this.state.ivalutionDate,
          
        });

        if (result.status) {
            if (this.state.image) {
                const formData = new FormData();
                formData.append("photo", this.state.image.raw);
                formData.append("files", this.state.fileme);
                formData.set("name", this.state.name);
                formData.set("empNumber", this.state.empNumber);
                formData.set("dateOfBirth", this.state.dateOfBirth);
                formData.set("email", this.state.email);
                formData.set("empType", this.state.empType);
                formData.set("phoneNo", this.state.phoneNo);
                formData.set("Address", this.state.Address);
                formData.set("joindate", this.state.joindate);
                formData.set("ivalutionDate", this.state.ivalutionDate);
                formData.set("isImageUpdated", this.state.isUpdated);
                formData.set("isFileUpdated", this.state.isfileUpdated);

                axios.put(`http://localhost:8092/api/UpdateEmployee/${this.state.id}`, formData).then(res => {
                    Alert("success", "Done!", "updated Successfully.");
                    this.setState({
                        image:null,
                        filecv:null,
                        name:"",
                        empNumber:"",
                        dateOfBirth:"",
                        email:"",
                         empType:"",
                        phoneNo:"",
                         Address:"",
                        joindate:"",
                        ivalutionDate:"",
                    });

                    this.props.history.push("/admin/employees")

                }).catch(err => {
                    Alert("error", "Something went wrong.", err)
                })
            } else {
                Alert("error", "Form Validation Error!", "Please upload image.")
            }

        } else {
            Alert("error", "Form Validation Error!", result.error)
        }

    }

    render() {
        return (
            <CreateContainer>
             <div className="">
                    <div className="row g-0">
                        <div className="col-md-7">
                            <img src={this.state.image ? this.state.image.preview : dummy_image} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-5 p-3">
                            <div className="card-body">
                                <h4 className="card-title text-secondary mt-3">Update Emoployee Details</h4>
                                <hr class="" />
                                
                                <form onSubmit={(e) => this.submit(e)}>
                                <div className="mb-3">
                                        <label for="name" className="form-label">Name</label>
                                        <input
                                            className="form-control"
                                            id="name"
                                            value={this.state.name}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label for="empNumber" className="form-label">Employee Number</label>
                                        <input
                                            className="form-control"
                                            id="empNumber"
                                            value={this.state.empNumber}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label for="condition" className="">Employee Birth</label>
                                        <input
                                            className="form-control"
                                            id="dateOfBirth"
                                            type="date"
                                            value={this.state.dateOfBirth}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label for="description" className="">Employee Email</label>
                                        <input
                                            className="form-control"
                                            id="email"
                                            type="date"
                                            value={this.state.email}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label for="price" className="form-label">Date Of Birth</label>
                                        <select
                                            value={this.state.empType}
                                            onChange={(e) => this.onSelectValueChange(e)}
                                            class="form-select"
                                            id="empType">
                                            <option  value={"--Select Category--"}>--Select Category--</option>
                                            <option value="Part _ Time">Part _ Time</option>
                                           <option value="Full _ Time">Full _ Time </option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label for="milage" className="form-label">Phone No</label>
                                        <input
                                            className="form-control"
                                            id="phoneNo"
                                            type="number"
                                            value={this.state.phoneNo}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label for="sheets" className="form-label">Address</label>
                                        <input
                                            className="form-control"
                                            id="Address"
                                            value={this.state.Address}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label for="condition" className="form-label">Join Date</label>
                                        <input
                                            className="form-control"
                                            id="joindate"
                                            type="date"
                                            value={this.state.joindate}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label for="description" className="form-label">End date</label>
                                        <input
                                            className="form-control"
                                            id="ivalutionDate"
                                            type="date"
                                            value={this.state.ivalutionDate}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <div className="mb-3">
                                            <label for="formFile" className="form-label">Emoployee Image</label>
                                            <input
                                                accept="image/*"
                                                className="form-control"
                                                type="file"
                                                id="formFile"
                                                onChange={(e) => this.handleChangeFile(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="mb-3">
                                            <label for="formFile" className="form-label">Emoployee CV </label>
                                            <input
                                                accept="myfile/*"
                                                className="form-control"
                                                type="file"
                                                id="formFile"
                                                onChange={(e) => this.handlefileChangeFile(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 mx-auto">
                                        <button type="submit" className="btn btn-primary">Update Employee</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            
        
            </CreateContainer>
        );
    }
}

export default withRouter(UpdateEmployee);
const CreateContainer = styled.div`
  img{
   
  }
  h4{
    front-color: black
  }

background: black;

.nav-link{
color:white !important;
&:hover{
    background-image: linear-gradient(to right top, #3f7f85, #578e9a, #6f9dad, #89acbf, #a2bbd0, #9eb7cb, #99b2c7, #95aec2, #7396a6, #527e89, #34666b, #194f4c);
}
}
.container{
    background:gray;
    margin-top:30px;
    border: 1px solid  gray
}
div {
    border-radius: 5px;
    background-color: white;
    padding:1px;
  }
hr{
    height: 10px;
    border: 1;
    box-shadow: inset 0 9px 9px -3px rgba(11, 99, 184, 0.8);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
    }
`;
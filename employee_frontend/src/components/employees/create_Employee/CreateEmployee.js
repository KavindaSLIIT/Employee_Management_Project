import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import { Alert } from '../../../services/Alert';
import EmployeeValidations from '../../../validations/EmployeeValidations';
import dummy_image from "../../../assets/images/dummy_image.jpg";


class CreateEmployee extends Component {
    constructor(props) {//asign to the values using java script constructor
        super(props);
        this.state = {
            image: null,
            name: "",
            empNumber: "",
            dateOfBirth:"",
            email:"",
            empType: "",
            phoneNo:"",
            Address:"",
            joindate: "",
            ivalutionDate: "",
           filecv:null
           
        }
    }



    // Handle input feild
    onInputValueChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    
    handleChangeFile = (e) => {
        if (e.target.files.length) {
            const img = {
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            };
            this.setState({ image: img });
        }
    };
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

    // Function for Check Status code
    handleError = (err) => {
        if (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    Alert("error", "Something went wrong!", err.response.data)

                }
            } else {
                Alert("error", "Something went wrong.", err)

            }
        }
    }
    onSelectValueChange = (e) => {
        this.setState({[e.target.id]:e.target.value});
    }

    // Function for create Employee
    submit = (e) => {

        e.preventDefault();

        const result = EmployeeValidations({
            name:this.state.name,
            empNumber:this.state.empNumber,
            dateOfBirth: this.state.dateOfBirth,
            email: this.state.email,
            empType: this.state.empType,
        
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
                console.log("formData", this.state);
              

                axios.post("http://localhost:8092/api/Add", formData).then(res => {
                    Alert("success", "Done!", "Employee Created Successfully.");
                    this.setState({
                        image: null,
                        filecv:null,
                        name: "",

                        empNumber: "",
                        dateOfBirth:"",
                        email:"",
                        empType: "",
                      
                        phoneNo:"",
                        Address:"",
                        joindate: "",
                        ivalutionDate: "",
                       
                    });
                    this.props.history.push("/admin/employees")
                }).catch(err => {
                    this.handleError(err);
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
    
            <div className="container">
              <div className="">
                    <div className="row g-0">
                        <div className="col-md-7">
                            <img src={this.state.image ? this.state.image.preview : dummy_image} className=""  alt="..." />
                        </div>
                        <div className="col-md-5 p-3">
                            <div className="card-body">
                                <h4 className="card-title text-secondary mt-3">Create Emoployee</h4>
                                <hr class="" />
                                
                                <form onSubmit={(e) => this.submit(e)}>
                                <div className="mb-3">
                                        <label for="name" className="">Name</label>
                                        <input
                                            className="form-control"
                                            id="name"
                                            value={this.state.name}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label for="empNumber" className="">Employee Number</label>
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
                                    <select
                                            value={this.state.empType}
                                            onChange={(e) => this.onSelectValueChange(e)}
                                            class="form-select"
                                            id="empType">
                                            <option  value={"--Select Category--"}>--Select Category--</option>
                                            <option value="Part _ Time">Part _ Time</option>
                                           <option value="Full _ Time">Full _ Time </option>
                                            <option value="Another">Another</option>
                                        </select>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label for="milage" className="">Phone No</label>
                                        <input
                                            className="form-control"
                                            id="phoneNo"
                                            type="number"
                                            value={this.state.phoneNo}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label for="sheets" className="">Address</label>
                                        <input
                                            className="form-control"
                                            id="Address"
                                            value={this.state.Address}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label for="condition" className="">Join Date</label>
                                        <input
                                            className="form-control"
                                            id="joindate"
                                            type="date"
                                            value={this.state.joindate}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label for="description" className="">End date</label>
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
                                            <label for="formFile" className="">Employee Image</label>
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
                                            <label for="formFile" className="">Employee CV</label>
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
                                        <button type="submit" className="btn btn-primary">Create Emoployee</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <br/>
        <br/>
            </CreateContainer>
         
        );
    }
}

export default withRouter(CreateEmployee);
const CreateContainer = styled.div`
  img{
   height:600px;
  }
  h4{
    front-color: black
  }
.nav-link{
color:white !important;
&:hover{
    background-image: linear-gradient(to right top, #3f7f85, #578e9a, #6f9dad, #89acbf, #a2bbd0, #9eb7cb, #99b2c7, #95aec2, #7396a6, #527e89, #34666b, #194f4c);
}
}
div {
    border-radius: 5px;
    background-color: white;
    padding:1px;
  }
  .container{
    background:gray;
    margin-top:30px;
    border: 7px solid  gray
}
.imag{
    background-image: url(../../../assets/images/dummy_image.jpg);
  
  hr{
    height: 10px;
    border: 1;
    box-shadow: inset 0 9px 9px -3px gray;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
    }
    
`;
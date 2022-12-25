import { useState } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import logo from './my1.png';
import styles from "./signup.css";
//import { Alert } from '../../../../services/Alert';
const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	
	const [msg,setMsg]=useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8092/api/";
			const { data: res } = await axios.post(url, data);
			//navigate("/login");
			setMsg(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
				
			) {
				setError(error.response.data.message);
			
			}
		}
	};

	return (
		<div className="signup_container">
			<div className="signup_form">
				<div className="rights">
				<img src={logo} alt="My logo"  style={{ height: 180, width: 180, borderColor: 'gray', borderWidth: 2,  marginBottom: 10 , marginleft:10} }/>
					<h1>Welcome Back</h1>
					<Link to="/admin/employees/Login">
						<button type="button" className="white_btn">
							Sing in
						</button>
					</Link>
				</div>
				<div className="lefts">
					<form className="form_my" onSubmit={handleSubmit}>
					
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className="inputs"
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className="inputs"
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="inputs"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="inputs"
						/>

						{error && <div className="error_msg">{error}</div>}
						{msg && <div className="sucess_msg">{msg}</div>}
						<button type="submit" className="green_btn">
							Sing Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
import { useState } from "react";
import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./login.css";
import logo from './my1.png';

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8092/api/adding";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/employees";
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
		<div className="login">
			<div className="login_form">
				<div className="lefts">
					<form className="form_my" onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>	<br/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="inputs"
						/>
						<br/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="inputs"
						/>	<br/>
						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="green_btn">
							Sign In
						</button>
					</form>
				</div>
				<div className="rights">
				<img src={logo} alt="My logo"  style={{ height: 180, width: 180, borderColor: 'gray', borderWidth: 2,  marginBottom: 10 , marginleft:10} }/>
					<h3>Don't have an account ?</h3>
					<Link to="/admin/employees/Signup">
						<button type="button" className="white_btn">
							Sign Up
						</button>
					</Link>
				</div>
				<br/>
			</div>
			<br/>
		</div>
	);
};

export default Login;
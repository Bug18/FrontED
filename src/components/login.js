import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./css_components/login.css";
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';


export default function Login(){
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	function validateForm() {
		return email.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
		window.sessionStorage.setItem('username', email);
		// get user role
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: email, password: password })
		};
		fetch('http://10.10.30.10:9000/api/login', requestOptions)
			.then(function(response){ return response.json(); })
			.then(function(data) {
				window.sessionStorage.setItem('role', data["role"]);
			})

		navigate("/dashboard");
	}

	return (
		<div className="Login">
			<div className="Login-container">
				<Form id="login-form" className="mb-3" onSubmit={handleSubmit}>
					<Form.Group size="lg" controlId="email">
						<Form.Label><h2>Email</h2></Form.Label>
						<Form.Control
							autoFocus
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="password">
						<Form.Label><h2>Password</h2></Form.Label>
						<Form.Control
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Button id="login-button" block size="lg" type="submit" disabled={!validateForm()}>
						Login
					</Button>
				</Form>

				<Link to="/signup">Don't have an account? Click here to create one!</Link>
			</div>
		</div>
	);
}
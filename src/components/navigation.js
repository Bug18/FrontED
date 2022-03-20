import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation} from "react-router-dom";

const Navigation = () => {
	const location = useLocation();


	return (
		<Navbar expand="lg" bg="dark" variant="dark">
			<Container fluid>
				<Navbar.Brand>Building Manager</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav"/>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav>
						<Nav.Link href="/">Home</Nav.Link>
						{ (location.pathname === "/" || location.pathname === "/logout")? null : <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
						{ (location.pathname === "/login" || location.pathname === "/dashboard" || location.pathname === "/signup")? null : <Nav.Link href="/login">Login</Nav.Link>}
						{ (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/logout" || location.pathname === "/signup") ? null : <Nav.Link href="/logout">Logout</Nav.Link>}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}


export default Navigation;
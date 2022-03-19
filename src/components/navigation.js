import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const Navigation = () => {
	return (
		<Navbar expand="lg" bg="dark" variant="dark">
			<Container fluid>
				<Navbar.Brand>LED Controller</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav"/>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav>
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/dashboard">Dashboard</Nav.Link>
						<Nav.Link href="/login">Login</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
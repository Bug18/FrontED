import React from 'react';
import Background from "./images/naslovna.jpg";
import "./css_components/logout.css";
import {useLocation} from "react-router-dom";


const Logout = () => {
	sessionStorage.removeItem("username");
	sessionStorage.removeItem("role");
	return(
		<div>
			<h1>Thanks for visiting! You are now logged out!</h1>
		</div>

	);
}

export default Logout;
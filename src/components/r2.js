import tlocrt from "./images/tlocrt2.jpg";
import "./css_components/r2.css";
import {Col, Row} from "react-bootstrap";
import React, {useEffect} from "react";

const r1 = () => {
	return (
		<>
			<div>
				<h1 className = "Naslov" >Dobrodošli u sobu!</h1>
			</div>
			<div id="tlocrt" style = {{ background: `url(${tlocrt})`,
				opacity: `70%`}}>
			</div>

		</>

	);

}

export default r1;